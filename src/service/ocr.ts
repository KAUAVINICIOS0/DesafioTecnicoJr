export function ocr(text: string){

    const lines = text
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean);

    const marketName = lines[0];

    const cnpj = text.match(/([\d./-]+)/);

    const date = lines[3].match(/\d{1,2}[\/-]\d{1,2}[\/-]\d{4}/);

    const hour = lines[3].match(/\d{1,2}:\d{2}/);

    const description = lines[5].match(/[A-Za-z]+/g)?.join(' ')?? '';

    const quantity = lines[5].match(/\d+/);

    const unitValor = lines[5].match(/\d+,\d{2}/);

    const description1 = lines[6].match(/[A-Za-z]+/g)?.join(' ')?? '';

    const quantity1 = lines[6].match(/\d+/);

    const unitValor1 = lines[6].match(/\d+,\d{2}/);

    const total = lines[7].match(/R\$\s\d{1,2},\d{1,2}/)

    const payment = lines[8].match(/([A-Za-zÀ-ÿ ]+)/g);

    
    return {
        business: {
            name: marketName,
            cnpj: cnpj?.[0] ?? null,
        },
        date: date?.[0] ??null,
        hour: hour?.[0] ??null,
        items: [
            {
                description: description,
                quantity: quantity?.[0] ?? null,
                unitValor: unitValor?.[0]??null,
            },
            {
                description: description1,
                quantity: quantity1?.[0] ?? null,
                unitValor: unitValor1?.[0]??null,
            },
        ],
        total:total?.[0]??null,
        payment:payment?.[1]??null,
    }
}