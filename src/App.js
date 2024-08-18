// src/App.js
import React, { useEffect } from 'react';
import Invoice from './components/Invoice';
import PaymentReminder from './components/PaymentReminder';

function App() {
    useEffect(() => {
    }, []);

    return (
        <div className="App">
            <h1>Payment Reminder App</h1>
            <Invoice templateId="default" />
            <PaymentReminder />
        </div>
    );
}

export default App;
