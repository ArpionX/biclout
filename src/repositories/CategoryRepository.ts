export class CategoryRepository{
    private storageKey = 'app_categorias';

    ObtenerCategorias(): string[]{
        if(typeof window === 'undefined') return ['Trabajo', 'Personal', 'Urgente'];
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data): ['Trabajo', 'Personal', 'Urgente'];
    }

    GuardarCategorias(categorias: string[]): boolean{
        if(typeof window === 'undefined') return false;
        localStorage.setItem(this.storageKey, JSON.stringify(categorias));
        return true;
    }

    CrearCategoria(categoria: string): boolean{
        const categorias = this.ObtenerCategorias();
        if(!categorias.includes(categoria)){
            categorias.push(categoria);
            this.GuardarCategorias(categorias);
            return true;
        }
        return false;
    }
}