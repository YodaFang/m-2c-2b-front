export interface TermsAndConditionsType {
    title: string,
    description: string,
    details: {
        label: string,
        content: string
    }[]
}

export const termsAndConditionsData: TermsAndConditionsType[] = [
    {
        title: 'Acceptance of Terms',
        description: 'By accessing or using the Furnisy website, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you should not use our website.',
        details: [],
    },
    {
        title: 'Changes to Terms',
        description: 'We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the updated Terms on our website and indicating the effective date. Your continued use of our website after any changes constitutes your acceptance of the new Terms.',
        details: [],
    },
    {
        title: 'Use of Website',
        description: 'You agree to use our website only for lawful purposes and in accordance with these Terms. You must not use our website:',
        details: [
            { label: "", content: 'In any way that violates any applicable federal, state, local, or international law or regulation.' },
            { label: "", content: 'To engage in any fraudulent, abusive, or harmful conduct.' },
            { label: "", content: 'To transmit any unsolicited or unauthorized advertising, promotional materials, or spam.' },
            { label: "", content: 'To impersonate or attempt to impersonate Luxura Pro, our employees, another user, or any other person or entity.' },
        ],
    },
    {
        title: 'Account Registration',
        description: 'To access certain features of our website, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
        details: [],
    },
    {
        title: 'Orders and Payment',
        description: 'All orders placed through our website are subject to our acceptance. We reserve the right to refuse or cancel any order at any time for any reason. You agree to provide current, complete, and accurate purchase and account information for all purchases made through our website. By placing an order, you represent and warrant that you have the legal right to use the payment method provided.',
        details: [],
    },
    {
        title: 'Pricing and Availability',
        description: 'All prices are subject to change without notice. We strive to display accurate product information, but errors may occur. In the event of an error in pricing or availability, we reserve the right to cancel or refuse any orders placed for products listed at the incorrect price.',
        details: [],
    },
    {
        title: 'Shipping and Delivery',
        description: 'We offer shipping to the addresses within the regions specified on our website. Shipping and delivery dates are estimates and not guaranteed. We are not responsible for any delays caused by circumstances beyond our control.',
        details: [],
    },
    {
        title: 'Returns and Refunds',
        description: 'Our return and refund policy is outlined on our website. Please review the policy for details on how to return items and request refunds.',
        details: [],
    },
    {
        title: 'Intellectual Property',
        description: 'All content on our website, including text, graphics, logos, images, and software, is the property of Furnisy or its content suppliers and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without our prior written consent.',
        details: [],
    },
    {
        title: 'Limitation of Liability',
        description: 'To the fullest extent permitted by law, Furnisy shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the website, (ii) any unauthorized access to or use of our servers and/or any personal information stored therein, (iii) any interruption or cessation of transmission to or from the website, (iv) any bugs, viruses, Trojan horses, or the like that may be transmitted to or through our website by any third party, (v) any errors or omissions in any content or for any loss or damage of any kind incurred as a result of your use of any content posted, emailed, transmitted, or otherwise made available via the website, and/or (vi) the defamatory, offensive, or illegal conduct of any third party.',
        details: [],
    },
    {
        title: 'Indemnification',
        description: 'You agree to indemnify, defend, and hold harmless Furnisy, its affiliates, and their respective officers, directors, employees, agents, licensors, and suppliers from and against all claims, losses, liabilities, expenses, damages, and costs, including reasonable attorneys’ fees, arising out of or relating to your use of our website, your violation of these Terms, or your violation of any rights of another.',
        details: [],
    },
    {
        title: 'Governing Law',
        description: 'These Terms and your use of our website shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms shall be brought exclusively in the federal or state courts located in [Your Jurisdiction], and you hereby consent to the personal jurisdiction and venue therein.',
        details: [],
    },
    {
        title: 'Contact Us',
        description: 'If you have any questions or concerns about these Terms, please contact us at:',
        details: [
            { label: 'Email', content: 'support@yourdomain.com' },
            { label: 'Address', content: '255 New Ave, California City-100, USA.' },
        ],
    },
];
