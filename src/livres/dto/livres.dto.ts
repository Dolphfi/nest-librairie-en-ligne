import { Expose, Transform, Type } from "class-transformer";
import exp from "constants";

export class LivresDto{
    @Expose()
    totalLivres:number;
    @Expose()
    limit:number;
    @Expose()
    @Type(() => LivreList)
    livres:LivreList[];
}

export class LivreList{
    @Expose({name:'livre_id'})
    id:number;
    @Expose({name:'livre_titre'})
    titre:string;
    @Expose({name:'livre_auteur'})
    auteur:string;
    @Expose({name:'livre_prix'})
    prix:number;
    @Expose({name:'livre_stock'})
    stock:number;
    @Expose({name:'livre_images'})
    @Transform(({value})=>value.toString().split(','))
    images:string[];
    @Transform(({obj})=>{
        return{
            id:obj.category_id,
            titre:obj.category_genre
        }
    })
    @Expose()
    category:any;
    @Expose({name:'reviews_count'})
    review:number;
    @Expose({name:'reviewsratingAvg'})
    rating:number;
}