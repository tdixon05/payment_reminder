
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9NEPrWFYe2LIx1-s5gtk7G1y3fz1OVcg",
  authDomain: "payment-reminder-65967.firebaseapp.com",
  projectId: "payment-reminder-65967",
  storageBucket: "payment-reminder-65967.appspot.com",
  messagingSenderId: "908601290331",
  appId: "1:908601290331:web:38af046a81bef43bf9597e"
};

try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log('Firebase initialized successfully.');
} catch (error) {
    console.error('Error initializing Firebase:', error);
}

// Function to create an invoice template
const createInvoiceTemplate = async (templateId) => {
    const invoiceTemplate = {
        templateId: templateId,
        companyInfo: {
            name: "Your Company Name",
            address: "Company Address",
            cityStateZip: "City, State, ZIP Code",
            phone: "Phone Number",
            email: "Email Address",
        },
        clientInfo: {
            name: "Client Name",
            address: "Client Address",
            cityStateZip: "City, State, ZIP Code",
            phone: "Phone Number",
            email: "Email Address",
        },
        items: [],
        invoiceDetails: {
            number: "Invoice Number",
            date: "Invoice Date",
            dueDate: "Due Date",
            paymentTerms: "Payment Terms",
        },
        summary: {
            subtotal: 0,
            tax: 0,
            totalAmountDue: 0,
        },
        notes: [
            "Please make the payment by the due date to avoid any late fees.",
            "Thank you for your business!"
        ]
    };

    try {
        await setDoc(doc(db, "invoices", templateId), invoiceTemplate);
        console.log('Invoice template created successfully:', templateId);
    } catch (error) {
        console.error('Error creating invoice template:', error);
    }
};
