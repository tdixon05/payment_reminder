
import React, { useState } from 'react';
import { db, setDoc, doc } from '../firebase';

const Invoice = () => {
    const [companyInfo, setCompanyInfo] = useState({
        name: '',
        address: '',
        cityStateZip: '',
        phone: '',
        email: '',
    });

    const [clientInfo, setClientInfo] = useState({
        name: '',
        address: '',
        cityStateZip: '',
        phone: '',
        email: '',
    });

    const [items, setItems] = useState([
        { description: '', quantity: 0, unitPrice: 0, totalPrice: 0 }
    ]);

    const [invoiceDetails, setInvoiceDetails] = useState({
        number: '',
        date: '',
        dueDate: '',
        paymentTerms: 'Net 30',
    });

    const [summary, setSummary] = useState({
        subtotal: 0,
        tax: 0,
        totalAmountDue: 0,
    });

    const [notes, setNotes] = useState([
        "Please make the payment by the due date to avoid any late fees.",
        "Thank you for your business!"
    ]);

    const handleSubmit = async () => {
        const invoiceData = {
            companyInfo,
            clientInfo,
            items,
            invoiceDetails,
            summary,
            notes,
        };

        try {
            await setDoc(doc(db, "invoices", invoiceDetails.number), invoiceData);
            console.log('Invoice created successfully:', invoiceDetails.number);
        } catch (error) {
            console.error('Error creating invoice:', error);
        }
    };

    return (
        <div>
            <h2>Create Invoice</h2>
            {/* Your JSX code for invoice form inputs */}
            <button onClick={handleSubmit}>Save Invoice</button>
        </div>
    );
};

export default Invoice;
