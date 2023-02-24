export interface IFarmType {
    displayValue: string;
    value: string;
}

export let FarmTypes: IFarmType[] = [
    {
        displayValue: 'Layer Hatchery',
        value: 'layerHatchery',
    },
    {
        displayValue: 'Layer Commercial',
        value: 'layerCommercial',
    },
    {
        displayValue: 'Broiler Hatchery',
        value: 'broilerHatchery',
    },
    {
        displayValue: 'Broiler Commercial',
        value: 'broilerCommercial',
    },
];
