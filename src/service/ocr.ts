export function ocr(text: string){

    const lines = text
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean);

    const marketName = lines[0];
    const cnpj = text.match(/CNPJ:\s([\d./-]+)/);

    const dateTime = lines[3];

    
    return {
        merchant: {
            name: marketName,
            cnpj: cnpj?.[1] ?? null,
        },
        date: dateTime,
    };
}