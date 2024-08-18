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

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e, section, key, index = null) => {
        const value = e.target.value;

        if (section === 'companyInfo' || section === 'clientInfo' || section === 'invoiceDetails') {
            section === 'companyInfo'
                ? setCompanyInfo({ ...companyInfo, [key]: value })
                : section === 'clientInfo'
                ? setClientInfo({ ...clientInfo, [key]: value })
                : setInvoiceDetails({ ...invoiceDetails, [key]: value });
        } else if (section === 'items') {
            const updatedItems = [...items];
            updatedItems[index][key] = key === 'quantity' || key === 'unitPrice' ? parseFloat(value) : value;
            updatedItems[index]['totalPrice'] = updatedItems[index]['quantity'] * updatedItems[index]['unitPrice'];
            setItems(updatedItems);
            updateSummary();
        }
    };

    const addItem = () => {
        setItems([...items, { description: '', quantity: 0, unitPrice: 0, totalPrice: 0 }]);
    };

    const updateSummary = () => {
        const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
        const tax = subtotal * 0.1; // Assuming a 10% tax rate
        const totalAmountDue = subtotal + tax;
        setSummary({ subtotal, tax, totalAmountDue });
    };

    const handleSubmit = async () => {
        if (!companyInfo.name || !clientInfo.name || !invoiceDetails.number || !invoiceDetails.date || items.length === 0) {
            alert('Please fill out all required fields.');
            return;
        }

        const invoiceData = {
            companyInfo,
            clientInfo,
            invoiceDetails,
            items,
            summary,
            notes,
        };

        try {
            setLoading(true); // Show loading spinner
            await setDoc(doc(db, 'invoices', invoiceDetails.number), invoiceData);
            alert('Invoice submitted successfully!');
        } catch (error) {
            console.error('Error submitting invoice:', error);
            alert('Failed to submit invoice. Please try again.');
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Create a New Invoice</h1>

            <form onSubmit={(e) => e.preventDefault()}>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Company Information</h2>
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={companyInfo.name}
                        onChange={(e) => handleInputChange(e, 'companyInfo', 'name')}
                        className={`w-full mb-2 p-2 border rounded ${!companyInfo.name ? 'border-red-500' : ''}`}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={companyInfo.address}
                        onChange={(e) => handleInputChange(e, 'companyInfo', 'address')}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="City, State, ZIP"
                        value={companyInfo.cityStateZip}
                        onChange={(e) => handleInputChange(e, 'companyInfo', 'cityStateZip')}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={companyInfo.phone}
                        onChange={(e) => handleInputChange(e, 'companyInfo', 'phone')}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={companyInfo.email}
                        onChange={(e) => handleInputChange(e, 'companyInfo', 'email')}
                        className="w-full mb-2 p-2 border rounded"
                    />
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Client Information</h2>
                    <input
                        type="text"
                        placeholder="Client Name"
                        value={clientInfo.name}
                        onChange={(e) => handleInputChange(e, 'clientInfo', 'name')}
                        className={`w-full mb-2 p-2 border rounded ${!clientInfo.name ? 'border-red-500' : ''}`}
                    />
                    <input
                        type="text"
                        placeholder="Client Address"
                        value={clientInfo.address}
                        onChange={(e) => handleInputChange(e, 'clientInfo', 'address')}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="City, State, ZIP"
                        value={clientInfo.cityStateZip}
                        onChange={(e) => handleInputChange(e, 'clientInfo', 'cityStateZip')}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Client Phone"
                        value={clientInfo.phone}
                        onChange={(e) => handleInputChange(e, 'clientInfo', 'phone')}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="email"
                        placeholder="Client Email"
                        value={clientInfo.email}
                        onChange={(e) => handleInputChange(e, 'clientInfo', 'email')}
                        className="w-full mb-2 p-2 border rounded"
                    />
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
                    <input
                        type="text"
                        placeholder="Invoice Number"
                        value={invoiceDetails.number}
                        onChange={(e) => handleInputChange(e, 'invoiceDetails', 'number')}
                        className={`w-full mb-2 p-2 border rounded ${!invoiceDetails.number ? 'border-red-500' : ''}`}
                    />
                    <input
                        type="date"
                        placeholder="Invoice Date"
                        value={invoiceDetails.date}
                        onChange={(e) => handleInputChange(e, 'invoiceDetails', 'date')}
                        className={`w-full mb-2 p-2 border rounded ${!invoiceDetails.date ? 'border-red-500' : ''}`}
                    />
                    <input
                        type="date"
                        placeholder="Due Date"
                        value={invoiceDetails.dueDate}
                        onChange={(e) => handleInputChange(e, 'invoiceDetails', 'dueDate')}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Payment Terms"
                        value={invoiceDetails.paymentTerms}
                        onChange={(e) => handleInputChange(e, 'invoiceDetails', 'paymentTerms')}
                        className="w-full mb-2 p-2 border rounded"
                    />
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Items</h2>
                    {items.map((item, index) => (
                        <div key={index} className="mb-4 p-4 border rounded">
                            <input
                                type="text"
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) => handleInputChange(e, 'items', 'description', index)}
                                className={`w-full mb-2 p-2 border rounded ${!item.description ? 'border-red-500' : ''}`}
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={(e) => handleInputChange(e, 'items', 'quantity', index)}
                                className="w-full mb-2 p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Unit Price"
                                value={item.unitPrice}
                                onChange={(e) => handleInputChange(e, 'items', 'unitPrice', index)}
                                className="w-full mb-2 p-2 border rounded"
                            />
                            <p>Total Price: ${item.totalPrice.toFixed(2)}</p>
                        </div>
                    ))}
                    <button type="button" onClick={addItem} className="bg-gray-800 text-white py-2 px-4 rounded">
                        Add Another Item
                    </button>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Summary</h2>
                    <p>Subtotal: ${summary.subtotal.toFixed(2)}</p>
                    <p>Tax: ${summary.tax.toFixed(2)}</p>
                    <p>Total Amount Due: ${summary.totalAmountDue.toFixed(2)}</p>
                </section>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={loading || !companyInfo.name || !clientInfo.name || !invoiceDetails.number || !invoiceDetails.date || items.length === 0}
                >
                    {loading ? 'Submitting...' : 'Submit Invoice'}
                </button>
            </form>
        </div>
    );
};

export default Invoice;
