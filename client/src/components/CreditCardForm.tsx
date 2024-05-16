import React, { useEffect, useState } from 'react';

type CreditCardFormProps = {
    updateData: (cardData: string[]) => void
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ updateData }) => {
    const [cardNumbers, setCardNumbers] = useState<string[]>(['']);

    useEffect(() => {
        updateData(cardNumbers);
    }, [cardNumbers]);

    const handleInputChange = (index: number, value: string) => {
        const updatedCardNumbers = [...cardNumbers];
        updatedCardNumbers[index] = value;
        setCardNumbers(updatedCardNumbers);
    };

    const handleAddField = () => {
        setCardNumbers([...cardNumbers, '']);
    };

    const handleRemoveField = (index: number) => {
        const updatedCardNumbers = [...cardNumbers];
        updatedCardNumbers.splice(index, 1);
        setCardNumbers(updatedCardNumbers);
    };

    return (
        <div>
            {cardNumbers.map((cardNumber, index) => (
                <div key={index} className='flex'>
                    <label htmlFor={`cardNumber-${index}`} className="sr-only">
                        Номер кредитної картки {index + 1}
                    </label>
                    <input
                        id={`cardNumber-${index}`}
                        type="text"
                        value={cardNumber}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        placeholder="Реквізити банку"
                        className='w-full border-b-2 border-black p-1 mt-3 mb-3 pl-3'
                    />
                    {index > 0 && (
                        <button
                            type="button"
                            className='text-xl'
                            onClick={() => handleRemoveField(index)}
                            aria-label={`Видалити номер кредитної картки ${index + 1}`}
                        >
                            ×
                        </button>
                    )}
                </div>
            ))}
            <button className='w-full border-b-2 border-black p-1 mt-3 mb-3 pl-3' type="button" onClick={handleAddField}>
                Додати реквізити
            </button>
        </div>
    );
};

export default CreditCardForm;
