

export const logos = [
    
];

export const getLogo = (name: string) => logos.find(logo => (logo as any).name === name);