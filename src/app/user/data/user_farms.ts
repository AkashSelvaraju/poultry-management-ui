export let Status = {
    licensed: {
        code: 0,
        display: 'Licensed',
        icon: 'verified_user',
        color: 'green',
    },
    processing: {
        code: 1,
        display: 'Processing',
        icon: 'schedule',
        color: '#f7c735',
    },
    paymentIncomplete: {
        code: 2,
        display: 'Payment Incomplete',
        icon: 'report_problem',
        color: '#f00',
    },
};

export let UserFarms = [
    {
        name: 'Farm-1',
        status: Status.licensed,
    },
    {
        name: 'Farm-2',
        status: Status.processing,
    },
    {
        name: 'Farm-3',
        status: Status.paymentIncomplete,
    },
];
