export interface PrivacyPolicType {
    title: string,
    description: string,
    details: {
        label: string,
        content: string
    }[]
}
export const privacyPolicyData: PrivacyPolicType[] = [
    {
        title: 'Information We Collect',
        description: 'We collect various types of information to provide and improve our services to you:',
        details: [
            {
                label: 'Personal Information',
                content:
                    'When you create an account, make a purchase, or contact us, we may collect personal information such as your name, email address, phone number, billing and shipping addresses, and payment details.',
            },
            {
                label: 'Non-Personal Information',
                content:
                    'We may collect non-personal information about your visit to our website, including your IP address, browser type, device information, and browsing behavior.',
            },
        ],
    },
    {
        title: 'How We Use Your Information',
        description: 'We use the information we collect for various purposes, including:',
        details: [
            {
                label: "Processing Transactions:",
                content: 'To process and fulfill your orders, manage payments, and provide customer support.'
            },
            {
                label: "Improving Services:",
                content: 'To enhance our website, products, and services based on your feedback and usage patterns.'

            },
            {
                label: "Communication:",
                content: 'To send you updates, promotional offers, newsletters, and other information related to our products and services.'
            },
            {
                label: "Personalization:",
                content: 'To tailor your shopping experience and show you products and content that match your preferences.'
            },
            {
                label: "Security:",
                content: 'To protect our website and your information from unauthorized access, fraud, and other security threats.'
            },
        ],
    },
    {
        title: 'Sharing Your Information',
        description: 'We may share your information with third parties in the following circumstances:',
        details: [
            {
                label: 'Service Providers',
                content:
                    'We may share your information with trusted third-party service providers who assist us in operating our website, processing payments, delivering orders, and providing customer support.',
            },
            {
                label: 'Legal Requirements',
                content: 'We may disclose your information if required by law or in response to valid requests by public authorities.',
            },
            {
                label: 'Business Transfers',
                content:
                    'In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of the transaction.',
            },
        ],
    },
    {
        title: 'Cookies and Tracking Technologies',
        description:
            'We use cookies and similar tracking technologies to collect information about your browsing behavior and preferences. Cookies help us provide a better user experience, analyze site traffic, and show relevant advertisements. You can control the use of cookies through your browser settings.',
        details: []
    },
    {
        title: 'Data Security',
        description:
            'We implement a variety of security measures to protect your personal information. These measures include encryption, access controls, and secure payment processing. However, please note that no method of transmission over the internet or electronic storage is completely secure.',
        details: []
    },
    {
        title: 'Your Rights',
        description: 'You have the following rights regarding your personal information:',
        details: [
            {
                label: 'Access:',
                content: 'You can request access to the personal information we hold about you.'
            },
            {
                label: 'Correction:',
                content: 'You can request that we correct any inaccurate or incomplete information.'
            },
            {
                label: 'Deletion:',
                content: 'You can request that we delete your personal information, subject to certain legal obligations.'
            },
            {
                label: 'Opt-Out:',
                content: 'You can opt out of receiving promotional communications from us by following the unsubscribe instructions in our emails or contacting us directly.'
            },
        ],
    },
    {
        title: "Children's Privacy",
        description:
            "Our website is not intended for children under the age of 13, and we do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a child, we will take steps to delete the information as soon as possible.",
        details: []
    },
    {
        title: 'Changes to This Privacy Policy',
        description:
            'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated policy on our website and indicating the effective date.',
        details: []
    },
    {
        title: 'Contact Us',
        description:
            'If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:',
        details: [
            { label: 'Email:', content: 'support@yourdomain.com' },
            { label: 'Address:', content: '255 New Ave, California City-100, USA.' },
        ],
    },
];

