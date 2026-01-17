export function ocr(text: string) {

    const lines = text
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean);

    const descriptionRegex = /[A-Za-zÀ-ÿ]+/g;
    const quantityRegex = /\d+/;
    const valueRegex = /\d+,\d{2}/;
    const totalValueRegex = /(\d+,\d{2})$/;
    const items: any[] = [];


    const marketName = lines[0];

    const cnpj = text.match(/([\d./-]+)/);

    const date = lines[3].match(/\d{1,2}[\/-]\d{1,2}[\/-]\d{4}/);

    const hour = lines[3].match(/\d{1,2}:\d{2}/);

    for (let i = 5; i < lines.length; i++) {
        
        if (lines[i].includes('R$')) break;

        const description = lines[i].match(descriptionRegex)?.join(' ') ?? '';
        const quantity = lines[i].match(quantityRegex)?.[0] ?? null;
        const unitValor = lines[i].match(valueRegex)?.[0] ?? null;
        const totalValue = lines[i].match(totalValueRegex)?.[0] ?? null;

        
        if (!description && !quantity && !unitValor) continue;

        items.push({
            description,
            quantity,
            unitValor,
            totalValue,
        });
    }

    const total = lines[7].match(/R\$\s\d{1,2},\d{1,2}/)

    const payment = lines[8].match(/([A-Za-zÀ-ÿ ]+)/g);


    return {
        business: {
            name: marketName,
            cnpj: cnpj?.[0] ?? null,
        },
        date: date?.[0] ?? null,
        hour: hour?.[0] ?? null,
        items,
        total: total?.[0] ?? null,
        payment: payment?.[1] ?? null,
    }
}