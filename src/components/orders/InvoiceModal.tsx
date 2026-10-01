import React from 'react';
import { useApp } from '../../context/AppContext';
import { Printer, Download, X, CheckCircle2 } from 'lucide-react';

export const InvoiceModal: React.FC = () => {
  const { invoiceOrder, setInvoiceOrder } = useApp();

  if (!invoiceOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const gstAmount = Math.round((invoiceOrder.subtotal * 18) / 118); // 18% GST included

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Modal Top Bar (hidden during print) */}
        <div className="no-print p-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm">Glowora Tax Invoice</span>
            <span className="text-xs text-stone-400 font-mono">#{invoiceOrder.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white text-stone-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-stone-100 transition-colors"
            >
              <Printer size={14} /> Print / Save PDF
            </button>
            <button
              onClick={() => setInvoiceOrder(null)}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Invoice Document */}
        <div className="p-8 sm:p-10 space-y-6 text-stone-900 font-sans" id="printable-invoice">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b border-stone-200 gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-stone-950">
                Glowora
              </h1>
              <p className="text-xs text-stone-500 mt-1">Luxury Beauty & Clean Botanical Cosmetics</p>
              <p className="text-[11px] text-stone-500">GSTIN: 27AABCG9821K1Z8</p>
              <p className="text-[11px] text-stone-500">Bandra Kurla Complex, Mumbai, Maharashtra 400051</p>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest bg-stone-100 text-stone-800 px-2.5 py-1 rounded">
                Tax Invoice
              </span>
              <p className="font-mono text-sm font-bold text-stone-900 mt-2">
                Invoice No: {invoiceOrder.id}
              </p>
              <p className="text-xs text-stone-500 tabular-nums">
                Date: {invoiceOrder.date}
              </p>
              <p className="text-xs text-stone-500">
                Status: <strong className="text-emerald-700">{invoiceOrder.status}</strong>
              </p>
            </div>
          </div>

          {/* Billed To / Shipping Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs pb-4 border-b border-stone-100">
            <div>
              <p className="font-bold uppercase tracking-wider text-stone-400 text-[10px] mb-1">
                Billed & Shipped To:
              </p>
              <p className="font-bold text-stone-900 text-sm">{invoiceOrder.shippingAddress.fullName}</p>
              <p className="text-stone-600 leading-relaxed mt-0.5">{invoiceOrder.shippingAddress.street}</p>
              <p className="text-stone-600">{invoiceOrder.shippingAddress.city}, {invoiceOrder.shippingAddress.state} - {invoiceOrder.shippingAddress.pincode}</p>
              <p className="text-stone-600 mt-1">Phone: {invoiceOrder.shippingAddress.phone}</p>
              <p className="text-stone-600">Email: {invoiceOrder.userEmail}</p>
            </div>

            <div>
              <p className="font-bold uppercase tracking-wider text-stone-400 text-[10px] mb-1">
                Payment & Dispatch Details:
              </p>
              <p className="text-stone-700">Payment Mode: <strong className="uppercase">{invoiceOrder.paymentMethod}</strong></p>
              <p className="text-stone-700">Payment Status: <strong className="text-emerald-700">{invoiceOrder.paymentStatus}</strong></p>
              <p className="text-stone-700">Shipping Partner: BlueDart Express Air</p>
              <p className="text-stone-700">AWB Tracking: BD-{invoiceOrder.id.replace(/\D/g, '')}98</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-[#FAF9F5] text-stone-600 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3 text-center">HSN/SAC</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {invoiceOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-3 text-stone-400 tabular-nums">{idx + 1}</td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-stone-900">{item.product.name}</p>
                      <p className="text-[10px] text-stone-400">{item.product.brand} · {item.product.category}</p>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-stone-500">330499</td>
                    <td className="py-3 px-3 text-right tabular-nums">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-center tabular-nums">{item.quantity}</td>
                    <td className="py-3 px-3 text-right font-semibold text-stone-900 tabular-nums">
                      ₹{item.subtotal.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Breakdown */}
          <div className="pt-4 border-t border-stone-200 flex justify-end">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal (Inclusive of GST)</span>
                <span className="tabular-nums font-medium text-stone-900">
                  ₹{invoiceOrder.subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {invoiceOrder.discount > 0 && (
                <div className="flex justify-between text-rose-700">
                  <span>Discount ({invoiceOrder.couponCode || 'Promo'})</span>
                  <span className="tabular-nums font-semibold">
                    − ₹{invoiceOrder.discount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Estimated 18% GST (Included)</span>
                <span className="tabular-nums font-medium">₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Shipping & Handling</span>
                <span className="tabular-nums font-medium">
                  {invoiceOrder.deliveryCharge === 0 ? 'FREE' : `₹${invoiceOrder.deliveryCharge}`}
                </span>
              </div>

              <div className="pt-2 border-t-2 border-stone-900 flex justify-between items-baseline font-bold text-stone-900">
                <span className="text-sm">Net Total</span>
                <span className="font-serif text-lg tabular-nums">
                  ₹{invoiceOrder.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Signoff & Declaration */}
          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
            <div>
              <p className="font-semibold text-stone-700">Declaration:</p>
              <p>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
            </div>
            <div className="text-center sm:text-right shrink-0">
              <p className="font-serif font-bold text-stone-900 text-sm">Glowora Atelier</p>
              <p className="text-[10px]">Authorized Signatory</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
