import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PorCapitalComponent } from "./paises/pages/por-capital/por-capital.component";
import { PorPaisComponent } from "./paises/pages/por-pais/por-pais.component";
import { PorRegionComponent } from "./paises/pages/por-region/por-region.component";
import { VerPaisComponent } from "./paises/pages/ver-pais/ver-pais.component";

const routes: Routes = [
    {
        path:"",
        component: PorPaisComponent,
        pathMatch: "full"
    },
    {
        path:"region",
        component: PorRegionComponent
    },
    {
        path:"capital",
        component: PorCapitalComponent
    },
    {
        path: "pais/:id",
        component: VerPaisComponent
    }, //id-> id del país
    {
        path:"**",
        redirectTo: ""
    } //path:"**" -> cualquier otro path que no sean los anteriores

]

@NgModule({
    imports: [RouterModule.forRoot(routes)], //1
    exports: [RouterModule] //exportar para usar en el resto de módulos
})

export class AppRoutingModule{

}

//1-> RouterModule-> En el componente viene implícita la ruta. Importas las rutas y las exportas para que se puedan usar
//forRoot -> Rutas principales o padres