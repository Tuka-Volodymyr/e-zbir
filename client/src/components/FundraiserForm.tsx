    'use client'

    import {FormEvent, useState} from "react";
    import Select, {StylesConfig} from 'react-select';
    import CreditCardForm from "@/components/CreditCardForm";


    type FundraiserFormProps = {
        id: string,
        submit: (e: FormEvent<HTMLFormElement>, data:any) => void,
    }
    type FundraiserFormData = {
        name: string,
        jarLink: string,
        suma: number,
        description: string,
        categories: any[],
        creditCards: string[]
    }

    const options = [
        {value: 'Medical_Supplies_Equipment', label: 'Медичне обладнання'},
        {value: 'Support_Military_Forces', label: 'Підтримка військових'},
        {value: 'Psychological_Support', label: 'Психологічна підтримка'},
        {value: 'Education_Training', label: 'Навчання'},
        {value: 'Emergency_Medical_Assistance', label: 'Невідкладна медична допомога'},
        {value: 'Child_Protection', label: 'Захист дітей'},
        {value: 'Environmental_Safety', label: 'Екологія'},
        {value: 'Cyber_Security', label: 'Кібербезпека'},
        {value: 'Infrastructure_Restoration', label: 'Інфраструктура'},
        {value: 'Housing_Conditions', label: 'Житло'},
        {value: 'Support_Vulnerable_Groups', label: 'Підтримка вразливих груп людей'},
        {value: 'OTHER', label: 'Інше'},

    ];

    const customStyles: StylesConfig = {
        control: (provided, state) => ({
            ...provided,
            border: 'none',
            borderBottom: '2px solid black',
            borderRadius: '0px',
            padding: '1px',
            marginTop: '9px',
            marginBottom: '9px',
            outline: 'none',
            "&:hover": {
                outline: 'none',
            }
        }),
    };
    const FundraiserForm: React.FC<FundraiserFormProps> = ({id, submit}) => {
        const [formData, setFormData] = useState<FundraiserFormData>({
            name: '',
            jarLink: '',
            suma: NaN,
            description: '',
            categories: [],
            creditCards: [],
        });


        let inputStyle: string = 'w-full border-b-2 border-black p-1 mt-3 mb-3 pl-3'
        const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prevState => ({
                ...prevState,
                name: e.target.value
            }));
        };

        const handleJarLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prevState => ({
                ...prevState,
                jarLink: e.target.value
            }));
        };

        const handleSumaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prevState => ({
                ...prevState,
                suma: parseFloat(e.target.value)
            }));
        };

        const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prevState => ({
                ...prevState,
                description: e.target.value
            }));
        };
        const handleCreditCardData = (cardData: string[]) => {
            const creditCards = cardData.map(cardNumber => ({ cardNumber }));
            setFormData(prevState => ({
                ...prevState,
                creditCards: cardData
            }));
        };
        const handleCategoriesChange = (selectedOptions: any) => {
            setFormData(prevState => ({
                ...prevState,
                categories: selectedOptions ? selectedOptions.map((option: any) => option.value) : []
            }));
        };
        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            submit(e, formData);
        };

        const handleChange = (e: any) => {
            console.log(e);
        };


        return (
            <form id={id} onSubmit={handleSubmit}>
                <input className={inputStyle}
                       type="text"
                       placeholder='Назва Збору'
                       value={formData.name}
                       onChange={handleNameChange}
                />

                <input className={inputStyle}
                       type="text"
                       placeholder='Посилання на монобанку'
                       value={formData.jarLink}
                       onChange={handleJarLinkChange}
                />

                <input className={inputStyle}
                       type="number"
                       placeholder='Сума збору'
                       value={formData.suma}
                       onChange={handleSumaChange}
                />

                <input className={inputStyle}
                       type="text"
                       placeholder='Опис'
                       value={formData.description}
                       onChange={handleDescriptionChange}
                />
                <Select
                    options={options}
                    isMulti
                    onChange={handleCategoriesChange}
                    styles={customStyles}
                    placeholder="Оберіть одну або декілька категорій"
                />
                <CreditCardForm updateData={handleCreditCardData}/>
            </form>
        );
    };

    export default FundraiserForm;
