{/* NEW SIMPLIFIED PRICE QUOTE MODAL */ }
{
    showPriceQuoteModal && priceQuoteBooking && (
        <div className="modal-overlay" onClick={() => setShowPriceQuoteModal(false)}>
            <div className="modal-content new-quote-modal" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="new-quote-header">
                    <h2 className="new-quote-title">
                        <span className="dollar-icon">$</span>
                        Send Quote to {priceQuoteBooking.customerName}
                    </h2>
                    <button
                        className="modal-close"
                        onClick={() => setShowPriceQuoteModal(false)}
                    >
                        ✕
                    </button>
                </div>

                <div className="new-quote-body">
                    {/* Customer Details Section */}
                    <div className="customer-details-card">
                        <h3 className="section-heading">Customer Details</h3>
                        <div className="customer-grid">
                            <div className="customer-col">
                                <p><strong>Name:</strong> {priceQuoteBooking.customerName}</p>
                                <p><strong>Email:</strong> {priceQuoteBooking.customerEmail}</p>
                            </div>
                            <div className="customer-col">
                                <p><strong>Phone:</strong> {priceQuoteBooking.customerPhone}</p>
                                <p><strong>Vehicle:</strong> {priceQuoteBooking.vehicleName}</p>
                                <p><strong>Passengers:</strong> {priceQuoteBooking.numberOfPassengers}</p>
                            </div>
                        </div>
                    </div>

                    {/* Return Trip Alert - Conditional */}
                    {priceQuoteBooking.isReturnTrip && (
                        <div className="return-trip-alert">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span>Return Trip Detected - Please enter pricing for both journeys</span>
                        </div>
                    )}

                    {/* Base Fares Section */}
                    <div className="base-fares-section">
                        <div className="fare-field">
                            <label htmlFor="outboundFare">Outbound Base Fare ($) *</label>
                            <input
                                id="outboundFare"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="Enter base fare"
                                value={outboundFare}
                                onChange={(e) => setOutboundFare(e.target.value)}
                                className="fare-input-new"
                            />
                        </div>

                        {/* Return Fare - Only if return trip */}
                        {priceQuoteBooking.isReturnTrip && (
                            <div className="fare-field">
                                <label htmlFor="returnFare">Return Base Fare ($) *</label>
                                <input
                                    id="returnFare"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Enter return fare"
                                    value={returnFare}
                                    onChange={(e) => setReturnFare(e.target.value)}
                                    className="fare-input-new"
                                />
                            </div>
                        )}
                    </div>

                    {/* Additional Charges Section */}
                    <div className="additional-charges-section">
                        <div className="section-header-row">
                            <h3 className="section-heading-dark">Additional Charges (Optional)</h3>
                            <button
                                type="button"
                                className="add-item-btn-new"
                                onClick={addAdditionalCharge}
                            >
                                <span className="plus-icon">+</span>
                                Add Item
                            </button>
                        </div>

                        {additionalCharges.map((charge, index) => (
                            <div key={index} className="charge-row-new">
                                <input
                                    type="text"
                                    placeholder="Description (e.g., Airport fee, Tolls)"
                                    value={charge.description}
                                    onChange={(e) => updateAdditionalCharge(index, 'description', e.target.value)}
                                    className="charge-description-input"
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Amount"
                                    value={charge.amount}
                                    onChange={(e) => updateAdditionalCharge(index, 'amount', e.target.value)}
                                    className="charge-amount-input"
                                />
                                <button
                                    type="button"
                                    className="delete-charge-btn"
                                    onClick={() => removeAdditionalCharge(index)}
                                    title="Remove item"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Discount Section */}
                    <div className="discount-section-new">
                        <h3 className="section-heading-with-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Discount (Optional)
                        </h3>

                        <div className="discount-fields-row">
                            <div className="discount-field">
                                <label htmlFor="discountType">Type</label>
                                <select
                                    id="discountType"
                                    value={discountType}
                                    onChange={(e) => setDiscountType(e.target.value)}
                                    className="discount-type-select-new"
                                >
                                    <option value="percentage">% Percentage</option>
                                    <option value="fixed">$ Fixed</option>
                                </select>
                            </div>

                            <div className="discount-field">
                                <label htmlFor="discountValue">
                                    {discountType === 'percentage' ? 'Percentage (%)' : 'Amount ($)'}
                                </label>
                                <input
                                    id="discountValue"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder={discountType === 'percentage' ? 'e.g., 10' : 'e.g., 50'}
                                    value={discountValue}
                                    onChange={(e) => setDiscountValue(e.target.value)}
                                    className="discount-value-input-new"
                                />
                            </div>

                            <div className="discount-field discount-reason-field">
                                <label htmlFor="discountReason">Reason (Optional)</label>
                                <input
                                    id="discountReason"
                                    type="text"
                                    placeholder="e.g., Return booking"
                                    value={discountReason}
                                    onChange={(e) => setDiscountReason(e.target.value)}
                                    className="discount-reason-input-new"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Total Quote Display */}
                    <div className="total-quote-display">
                        <span className="total-label">Total Quote:</span>
                        <span className="total-amount">${calculatedTotal.toFixed(2)}</span>
                    </div>

                    {/* Additional Notes Section */}
                    <div className="additional-notes-section">
                        <label htmlFor="additionalNotes" className="notes-label">
                            Additional Notes (Optional)
                        </label>
                        <textarea
                            id="additionalNotes"
                            placeholder="Any special instructions or information for the customer..."
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                            className="notes-textarea"
                            rows="4"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="quote-modal-actions">
                        <button
                            type="button"
                            className="cancel-quote-btn"
                            onClick={() => setShowPriceQuoteModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="send-quote-btn"
                            onClick={handleSendPriceQuote}
                            disabled={sendingQuote || !outboundFare || (priceQuoteBooking.isReturnTrip && !returnFare)}
                        >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {sendingQuote ? 'Sending...' : 'Send Quote'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
