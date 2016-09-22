export abstract class ListElement {
    name: string;
    icon: string;
    id: string;
    editable: boolean;
    deleteable: boolean;

    constructor(name: string, icon: string, id?: string) {
        this.name = name;
        this.icon = icon;
        this.id = id;
    }
    
    abstract selectElement(): void;
    abstract edit(): void;
    abstract delete(): void;
    static addElement(): void {
    };

    




}
