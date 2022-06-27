export const ITEMS_PER_PAGE = 9;

export const vehicleTypes: Record<string, { name: string; description: string }> = {
    Campervan: {
        name: "Campervan",
        description: "Obytka s rozměry osobáku, se kterou dojedete všude.",
    },
    Intergrated: {
        name: "Integrál",
        description: "Král mezi karavany. Luxus na kolech.",
    },
    BuiltIn: {
        name: "Vestavba",
        description: "Celý byt geniálně poskládaný do dodávky.",
    },
    Alcove: {
        name: "Přívěs",
        description: "Tažný karavan za vaše auto. Od kapkovitých až po rodinné.",
    },
};
