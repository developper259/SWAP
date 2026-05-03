/**
 * Message Service - Handles all message and conversation operations with API integration
 */

import { Message, Conversation, MessageSender } from '@/struct';
import { apiService, ApiResponse } from './api.service';

export class MessageService {
  private conversations: Map<string, Conversation> = new Map();
  private messages: Map<string, Message[]> = new Map();
  private resource = 'messages';

  constructor(initialConversations: Conversation[] = []) {
    initialConversations.forEach(conv => {
      this.conversations.set(conv.id, conv);
      this.messages.set(conv.id, conv.messages);
    });
  }

  // ==================== API CALLS ====================

  // Create conversation via API
  async createConversationApi(data: {
    partnerId: string;
    partnerName: string;
    partnerAvatar: string;
  }): Promise<ApiResponse<Conversation>> {
    const response = await apiService.create<Conversation>(`${this.resource}/conversations`, data);
    if (response.data) {
      this.conversations.set(response.data.id, response.data);
      this.messages.set(response.data.id, []);
    }
    return response;
  }

  // Get conversation by ID via API
  async getConversationApi(id: string): Promise<ApiResponse<Conversation>> {
    return apiService.getById<Conversation>(`${this.resource}/conversations`, id);
  }

  // Get all conversations via API
  async getAllConversationsApi(): Promise<ApiResponse<Conversation[]>> {
    return apiService.getAll<Conversation>(`${this.resource}/conversations`);
  }

  // Send message via API
  async sendMessageApi(conversationId: string, content: string, sender: MessageSender): Promise<ApiResponse<Message>> {
    const response = await apiService.create<Message>(`${this.resource}/conversations/${conversationId}/messages`, {
      content,
      sender,
    });
    if (response.data) {
      const messages = this.messages.get(conversationId) || [];
      messages.push(response.data);
      this.messages.set(conversationId, messages);
    }
    return response;
  }

  // Get messages via API
  async getMessagesApi(conversationId: string, page?: number, limit?: number): Promise<ApiResponse<Message[]>> {
    const params: Record<string, number> = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;
    return apiService.get<Message[]>(`/${this.resource}/conversations/${conversationId}/messages`, params);
  }

  // Delete message via API
  async deleteMessageApi(conversationId: string, messageId: string): Promise<ApiResponse<void>> {
    return apiService.remove<void>(`${this.resource}/conversations/${conversationId}/messages`, messageId);
  }

  // Delete conversation via API
  async deleteConversationApi(id: string): Promise<ApiResponse<void>> {
    const response = await apiService.remove<void>(`${this.resource}/conversations`, id);
    if (!response.error) {
      this.messages.delete(id);
      this.conversations.delete(id);
    }
    return response;
  }

  // Mark as read via API
  async markAsReadApi(conversationId: string): Promise<ApiResponse<void>> {
    return apiService.patch<void>(`/${this.resource}/conversations/${conversationId}/read`, {});
  }

  // Search messages via API
  async searchMessagesApi(conversationId: string, query: string): Promise<ApiResponse<Message[]>> {
    return apiService.get<Message[]>(`/${this.resource}/conversations/${conversationId}/search`, { q: query });
  }

  // ==================== LOCAL OPERATIONS ====================

  // Create Conversation
  createConversation(data: {
    partnerId: string;
    partnerName: string;
    partnerAvatar: string;
  }): Conversation {
    const id = this.generateId('conv');
    const conversation: Conversation = {
      id,
      partnerId: data.partnerId,
      partnerName: data.partnerName,
      partnerAvatar: data.partnerAvatar,
      lastMessage: '',
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0,
      messages: [],
    };
    
    this.conversations.set(id, conversation);
    this.messages.set(id, []);
    return conversation;
  }

  // Get Conversation
  getConversation(id: string): Conversation | undefined {
    const conversation = this.conversations.get(id);
    if (!conversation) return undefined;
    
    return {
      ...conversation,
      messages: this.messages.get(id) || [],
    };
  }

  getConversationsByUserId(userId: string): Conversation[] {
    return Array.from(this.conversations.values())
      .filter(conv => conv.partnerId === userId);
  }

  getAllConversations(): Conversation[] {
    return Array.from(this.conversations.values()).map(conv => ({
      ...conv,
      messages: this.messages.get(conv.id) || [],
    }));
  }

  // Send Message
  sendMessage(conversationId: string, content: string, sender: MessageSender): Message | undefined {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) return undefined;
    
    const message: Message = {
      id: this.generateId('msg'),
      sender,
      content,
      timestamp: new Date().toISOString(),
      read: sender === 'user',
    };
    
    const messages = this.messages.get(conversationId) || [];
    messages.push(message);
    this.messages.set(conversationId, messages);
    
    // Update conversation
    conversation.lastMessage = content;
    conversation.lastMessageTime = message.timestamp;
    if (sender === 'other') {
      conversation.unreadCount += 1;
    }
    this.conversations.set(conversationId, conversation);
    
    return message;
  }

  // Get Messages
  getMessages(conversationId: string): Message[] {
    return this.messages.get(conversationId) || [];
  }

  getMessagesPaginated(conversationId: string, page: number, limit: number = 20): Message[] {
    const messages = this.messages.get(conversationId) || [];
    const start = Math.max(0, messages.length - (page * limit));
    const end = messages.length - ((page - 1) * limit);
    return messages.slice(start, end);
  }

  // Mark as Read
  markAsRead(conversationId: string): boolean {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) return false;
    
    conversation.unreadCount = 0;
    this.conversations.set(conversationId, conversation);
    
    const messages = this.messages.get(conversationId) || [];
    messages.forEach(msg => msg.read = true);
    this.messages.set(conversationId, messages);
    
    return true;
  }

  // Delete Message
  deleteMessage(conversationId: string, messageId: string): boolean {
    const messages = this.messages.get(conversationId);
    if (!messages) return false;
    
    const index = messages.findIndex(msg => msg.id === messageId);
    if (index === -1) return false;
    
    messages.splice(index, 1);
    this.messages.set(conversationId, messages);
    
    // Update last message if needed
    const conversation = this.conversations.get(conversationId);
    if (conversation && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      conversation.lastMessage = lastMsg.content;
      conversation.lastMessageTime = lastMsg.timestamp;
      this.conversations.set(conversationId, conversation);
    }
    
    return true;
  }

  // Delete Conversation
  deleteConversation(id: string): boolean {
    this.messages.delete(id);
    return this.conversations.delete(id);
  }

  // Search Messages
  searchMessages(conversationId: string, query: string): Message[] {
    const messages = this.messages.get(conversationId) || [];
    const lowerQuery = query.toLowerCase();
    return messages.filter(msg => 
      msg.content.toLowerCase().includes(lowerQuery)
    );
  }

  // Get Unread Count
  getTotalUnreadCount(): number {
    return Array.from(this.conversations.values())
      .reduce((total, conv) => total + conv.unreadCount, 0);
  }

  // Validation
  validateMessage(message: Partial<Message>): string[] {
    const errors: string[] = [];
    
    if (!message.content || message.content.trim().length === 0) {
      errors.push('Message content cannot be empty');
    }
    if (message.content && message.content.length > 1000) {
      errors.push('Message cannot exceed 1000 characters');
    }
    
    return errors;
  }

  private generateId(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
