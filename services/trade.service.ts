/**
 * Trade Service - Handles all trade and trade offer operations with API integration
 */

import { Trade, ActiveTrade, TradeOffer, TradeStatus } from '@/struct';
import { apiService, ApiResponse } from './api.service';

export class TradeService {
  private trades: Map<string, Trade> = new Map();
  private tradeOffers: Map<string, TradeOffer> = new Map();
  private resource = 'trades';

  constructor(initialTrades: Trade[] = []) {
    initialTrades.forEach(trade => this.trades.set(trade.id, trade));
  }

  // ==================== API CALLS ====================

  // Create trade via API
  async createTradeApi(data: {
    partner: string;
    partnerAvatar: string;
    partnerId?: string;
    itemA: string;
    itemAId?: string;
    itemB: string;
    itemBId?: string;
  }): Promise<ApiResponse<Trade>> {
    const response = await apiService.create<Trade>(this.resource, data);
    if (response.data) {
      this.trades.set(response.data.id, response.data);
    }
    return response;
  }

  // Get trade by ID via API
  async getTradeByIdApi(id: string): Promise<ApiResponse<Trade>> {
    const response = await apiService.getById<Trade>(this.resource, id);
    if (response.data) {
      this.trades.set(response.data.id, response.data);
    }
    return response;
  }

  // Get all trades via API
  async getAllTradesApi(): Promise<ApiResponse<Trade[]>> {
    const response = await apiService.getAll<Trade>(this.resource);
    if (response.data) {
      response.data.forEach(trade => this.trades.set(trade.id, trade));
    }
    return response;
  }

  // Get trades by status via API
  async getTradesByStatusApi(status: TradeStatus): Promise<ApiResponse<Trade[]>> {
    return apiService.get<Trade[]>(`/${this.resource}`, { status });
  }

  // Update trade via API
  async updateTradeApi(id: string, data: Partial<Trade>): Promise<ApiResponse<Trade>> {
    const response = await apiService.partialUpdate<Trade>(this.resource, id, data);
    if (response.data) {
      this.trades.set(id, response.data);
    }
    return response;
  }

  // Update trade status via API
  async updateTradeStatusApi(id: string, status: TradeStatus): Promise<ApiResponse<Trade>> {
    return this.updateTradeApi(id, { status });
  }

  // Approve trade via API
  async approveTradeApi(id: string): Promise<ApiResponse<Trade>> {
    return apiService.patch<Trade>(`/${this.resource}/${id}/approve`, {});
  }

  // Mark as transit via API
  async markAsTransitApi(id: string): Promise<ApiResponse<Trade>> {
    return apiService.patch<Trade>(`/${this.resource}/${id}/transit`, {});
  }

  // Complete trade via API
  async completeTradeApi(id: string): Promise<ApiResponse<Trade>> {
    return apiService.patch<Trade>(`/${this.resource}/${id}/complete`, {});
  }

  // Delete trade via API
  async deleteTradeApi(id: string): Promise<ApiResponse<void>> {
    const response = await apiService.remove<void>(this.resource, id);
    if (!response.error) {
      this.trades.delete(id);
    }
    return response;
  }

  // Create trade offer via API
  async createTradeOfferApi(data: {
    initiatorId: string;
    recipientId: string;
    offeredItems: string[];
    requestedItems: string[];
    message?: string;
    expiresAt?: string;
  }): Promise<ApiResponse<TradeOffer>> {
    const response = await apiService.create<TradeOffer>(`${this.resource}/offers`, data);
    if (response.data) {
      this.tradeOffers.set(response.data.id, response.data);
    }
    return response;
  }

  // Get trade offer by ID via API
  async getTradeOfferByIdApi(id: string): Promise<ApiResponse<TradeOffer>> {
    return apiService.getById<TradeOffer>(`${this.resource}/offers`, id);
  }

  // Get pending trade offers via API
  async getPendingTradeOffersApi(recipientId: string): Promise<ApiResponse<TradeOffer[]>> {
    return apiService.get<TradeOffer[]>(`/${this.resource}/offers`, { recipientId, status: 'pending' });
  }

  // Respond to trade offer via API
  async respondToTradeOfferApi(id: string, accept: boolean): Promise<ApiResponse<TradeOffer>> {
    return apiService.patch<TradeOffer>(`/${this.resource}/offers/${id}/respond`, { accept });
  }

  // Cancel trade offer via API
  async cancelTradeOfferApi(id: string): Promise<ApiResponse<TradeOffer>> {
    return apiService.patch<TradeOffer>(`/${this.resource}/offers/${id}/cancel`, {});
  }

  // Get trade stats via API
  async getTradeStatsApi(): Promise<ApiResponse<{
    total: number;
    pending: number;
    approved: number;
    transit: number;
    completed: number;
  }>> {
    return apiService.get(`/${this.resource}/stats`);
  }

  // ==================== LOCAL OPERATIONS ====================

  // Create Trade
  createTrade(data: {
    partner: string;
    partnerAvatar: string;
    partnerId?: string;
    itemA: string;
    itemAId?: string;
    itemB: string;
    itemBId?: string;
  }): Trade {
    const id = this.generateId('trade');
    const now = new Date().toISOString();
    const trade: Trade = {
      id,
      partner: data.partner,
      partnerAvatar: data.partnerAvatar,
      partnerId: data.partnerId,
      itemA: data.itemA,
      itemAId: data.itemAId,
      itemB: data.itemB,
      itemBId: data.itemBId,
      status: 'pending',
      date: now,
      createdAt: now,
      updatedAt: now,
    };
    
    this.trades.set(id, trade);
    return trade;
  }

  // Get Trade
  getTradeById(id: string): Trade | undefined {
    return this.trades.get(id);
  }

  getTradesByStatus(status: TradeStatus): Trade[] {
    return Array.from(this.trades.values()).filter(trade => trade.status === status);
  }

  getTradesByPartner(partnerId: string): Trade[] {
    return Array.from(this.trades.values()).filter(trade => trade.partnerId === partnerId);
  }

  getAllTrades(): Trade[] {
    return Array.from(this.trades.values());
  }

  // Get Active Trades
  getActiveTrades(): ActiveTrade[] {
    return this.getAllTrades()
      .filter(trade => trade.status !== 'completed')
      .map(trade => ({
        id: trade.id,
        partner: trade.partner,
        partnerAvatar: trade.partnerAvatar,
        itemA: trade.itemA,
        itemB: trade.itemB,
        status: trade.status,
        date: trade.date,
      }));
  }

  // Update Trade Status
  updateTradeStatus(id: string, status: TradeStatus): Trade | undefined {
    const trade = this.trades.get(id);
    if (!trade) return undefined;
    
    trade.status = status;
    trade.updatedAt = new Date().toISOString();
    this.trades.set(id, trade);
    
    return trade;
  }

  approveTrade(id: string): Trade | undefined {
    return this.updateTradeStatus(id, 'approved');
  }

  markAsTransit(id: string): Trade | undefined {
    return this.updateTradeStatus(id, 'transit');
  }

  completeTrade(id: string): Trade | undefined {
    return this.updateTradeStatus(id, 'completed');
  }

  // Update Trade
  updateTrade(id: string, data: Partial<Trade>): Trade | undefined {
    const trade = this.trades.get(id);
    if (!trade) return undefined;
    
    const updatedTrade = {
      ...trade,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.trades.set(id, updatedTrade);
    
    return updatedTrade;
  }

  // Delete Trade
  deleteTrade(id: string): boolean {
    return this.trades.delete(id);
  }

  // Trade Offers
  createTradeOffer(data: {
    initiatorId: string;
    recipientId: string;
    offeredItems: string[];
    requestedItems: string[];
    message?: string;
    expiresAt?: string;
  }): TradeOffer {
    const id = this.generateId('offer');
    const offer: TradeOffer = {
      id,
      initiatorId: data.initiatorId,
      recipientId: data.recipientId,
      offeredItems: data.offeredItems,
      requestedItems: data.requestedItems,
      status: 'pending',
      message: data.message,
      createdAt: new Date().toISOString(),
      expiresAt: data.expiresAt,
    };
    
    this.tradeOffers.set(id, offer);
    return offer;
  }

  getTradeOfferById(id: string): TradeOffer | undefined {
    return this.tradeOffers.get(id);
  }

  getTradeOffersByInitiator(initiatorId: string): TradeOffer[] {
    return Array.from(this.tradeOffers.values())
      .filter(offer => offer.initiatorId === initiatorId);
  }

  getTradeOffersByRecipient(recipientId: string): TradeOffer[] {
    return Array.from(this.tradeOffers.values())
      .filter(offer => offer.recipientId === recipientId);
  }

  getPendingTradeOffers(recipientId: string): TradeOffer[] {
    return this.getTradeOffersByRecipient(recipientId)
      .filter(offer => offer.status === 'pending');
  }

  respondToTradeOffer(id: string, accept: boolean): TradeOffer | undefined {
    const offer = this.tradeOffers.get(id);
    if (!offer || offer.status !== 'pending') return undefined;
    
    offer.status = accept ? 'accepted' : 'rejected';
    this.tradeOffers.set(id, offer);
    
    return offer;
  }

  cancelTradeOffer(id: string): TradeOffer | undefined {
    const offer = this.tradeOffers.get(id);
    if (!offer || offer.status !== 'pending') return undefined;
    
    offer.status = 'cancelled';
    this.tradeOffers.set(id, offer);
    
    return offer;
  }

  // Check if offer is expired
  isOfferExpired(offer: TradeOffer): boolean {
    if (!offer.expiresAt) return false;
    return new Date(offer.expiresAt) < new Date();
  }

  // Statistics
  getTradeStats(): {
    total: number;
    pending: number;
    approved: number;
    transit: number;
    completed: number;
  } {
    const trades = this.getAllTrades();
    return {
      total: trades.length,
      pending: trades.filter(t => t.status === 'pending').length,
      approved: trades.filter(t => t.status === 'approved').length,
      transit: trades.filter(t => t.status === 'transit').length,
      completed: trades.filter(t => t.status === 'completed').length,
    };
  }

  // Validation
  validateTrade(trade: Partial<Trade>): string[] {
    const errors: string[] = [];
    
    if (!trade.partner) {
      errors.push('Partner is required');
    }
    if (!trade.itemA || !trade.itemB) {
      errors.push('Both items are required for a trade');
    }
    
    return errors;
  }

  validateTradeOffer(offer: Partial<TradeOffer>): string[] {
    const errors: string[] = [];
    
    if (!offer.initiatorId || !offer.recipientId) {
      errors.push('Initiator and recipient are required');
    }
    if (!offer.offeredItems || offer.offeredItems.length === 0) {
      errors.push('At least one offered item is required');
    }
    if (!offer.requestedItems || offer.requestedItems.length === 0) {
      errors.push('At least one requested item is required');
    }
    
    return errors;
  }

  private generateId(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
