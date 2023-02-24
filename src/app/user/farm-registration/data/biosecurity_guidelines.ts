export interface IQuestion {
    SNo: string;
    question: string;
    answer?: boolean;
    correctiveAction?: string;
}

export interface IQuestionGroup {
    SNo: string;
    groupName: string;
    questions: IQuestion[];
}

export let BioSecurityGuidelines: IQuestionGroup[] = [
    {
        SNo: 'A',
        groupName: 'Documentation and training',
        questions: [
            {
                SNo: '1',
                question:
                    'Is a copy of the current Biosecurity Manual held on the production area and readily available?',
            },
            {
                SNo: '2',
                question:
                    'Has staff been given instruction / suitable training inthe relevant biosecurity procedures?',
            },
            {
                SNo: '3',
                question:
                    'Is a record kept of all relevant training received by employees?',
            },
            {
                SNo: '4',
                question: 'Is a bird mortality register being maintained?',
            },
            {
                SNo: '5',
                question:
                    'Is an appropriate bird movement register being maintained?',
            },
        ],
    },
    {
        SNo: 'B',
        groupName: 'Facility standards',
        questions: [
            {
                SNo: '1',
                question:
                    'Does the production area have a perimeter fence and can access routes be closed off to prevent vehicle entry?',
            },
            {
                SNo: '2',
                question:
                    'Is there a sketch or map clearly defining the production area and the property, including all access roads and gates?',
            },
            {
                SNo: '3',
                question:
                    'Is there adequate signage to inform visitors of the Biosecure Area and what action they should take?',
            },
            {
                SNo: '4',
                question: 'Is there an off-site parking area for visitiors?',
            },
            {
                SNo: '5',
                question:
                    'Are footbaths available and used at all entrances allowing personnel access to sheds?',
            },
            {
                SNo: '6',
                question:
                    'Are the footbaths inspected daily and replenished as required?',
            },
            {
                SNo: '7',
                question:
                    'Alternative to B5 and B6: is a separate pair of boots available and used for each poultry enclosure?',
            },
            {
                SNo: '8',
                question:
                    'Is the area around the sheds neat and tidy? E.g. grass, vegetation',
            },
            {
                SNo: '9',
                question:
                    'Are the sheds rodent proof? Is there a bait plan in position?',
            },
            {
                SNo: '10',
                question:
                    'Is hand sanitizer or washing facilities available and used at all entrances allowing personnel access to sheds?',
            },
            {
                SNo: '11',
                question:
                    'Are other livestock excluded from the production area or effectively restricted so that their faeces do not come in contact with poultry either directly or indirectly, e.g. water draining into poultry areas/shed?',
            },
            {
                SNo: '12',
                question: 'Are the sheds wild bird proof?',
            },
            {
                SNo: '13',
                question:
                    'Are no other pet caged or aviary birds, pigs or any other animals held on the property?',
            },
        ],
    },
];
