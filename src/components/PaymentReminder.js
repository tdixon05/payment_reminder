import React, { useEffect, useState } from 'react';
import { db, collection, query, where, getDocs } from '../firebase';

const PaymentReminder = () => {
    const [overdueInvoices, setOverdueInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOverdueInvoices = async () => {
            try {
                const invoicesRef = collection(db, 'invoices');
                const q = query(invoicesRef, where('status', '==', 'pending'));
                const querySnapshot = await getDocs(q);

                const invoices = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOverdueInvoices(invoices);
            } catch (err) {
                setError(`Error fetching overdue invoices: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchOverdueInvoices();
    }, []);

    const sendReminder = async (invoice) => {
        try {
            console.log(`Reminder sent to ${invoice.clientInfo.email} for Invoice #${invoice.invoiceDetails.number}`);
        } catch (err) {
            console.error(`Error sending reminder: ${err.message}`);
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Overdue Invoices</h2>
            {overdueInvoices.length === 0 ? (
                <p>No overdue invoices found.</p>
            ) : (
                <ul className="space-y-4">
                    {overdueInvoices.map(invoice => (
                        <li key={invoice.id} className="border p-4 rounded">
                            <div className="flex justify-between">
                                <span>Invoice #{invoice.invoiceDetails.number} for {invoice.clientInfo.name} is overdue.</span>
                                <button
                                    onClick={() => sendReminder(invoice)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Send Reminder
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PaymentReminder;
