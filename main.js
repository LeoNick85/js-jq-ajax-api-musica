// Con una chiamata ajax, recuperare i dischi musicali restituiti dall'api:
// https://flynn.boolean.careers/exercises/api/array/music
// Ciclare quindi i dischi e ottenuti e per ognuno di essi disegnare in pagina una card utilizzando handlebars.
// BONUS: creare una select con i generi dei dischi musicali (pop, rock, metal, jazz), tramite la quale si possono filtrare i dischi visualizzati (ad esempio: se nella tendina si seleziona il genere "metal", nella pagina saranno mostrati solo i dischi con il genere "metal").

//Al caricamento della pagina mostro tutti gli album disponibili
$(document).ready(function(){
    //Faccio chiamata ajax per avere lista album
    $.ajax({
        url : "https://flynn.boolean.careers/exercises/api/array/music",
        method : "GET",
        success: function(data) {
            //Salvo la lista di album
            var album_list = data.response;

            //Per ogni elemento della lista album, creo una card e la aggiungo in html
            for (var i = 0; i < album_list.length; i++) {
                makeCard(album_list[i]);
            }
        },
        error : function() {
            alert("Il negozio è chiuso");
        }
    })

    //Alla selezioni di un filtro select ristampo la pagina solo con gli elementi indicati dal filtro genere
    $("select").change(function(){
        //Prendo il valore del select e della option selezionata e svuoto la pagina
        var  filter_type = $(this).attr("name");
        var filter_value = $(this).val();
        $("#container-main").text("");

    $.ajax({
        url : "https://flynn.boolean.careers/exercises/api/array/music",
        method : "GET",
        success: function(data) {
            //Salvo la lista di album
            var album_list = data.response;

            //Se seleziono l'opzione "vuota" pubblico tutti i risutlati
            if (filter_value == "") {
                //Salvo la lista di album
                var album_list = data.response;

                //Per ogni elemento della lista album, creo una card e la aggiungo in html
                for (var i = 0; i < album_list.length; i++) {
                    makeCard(album_list[i]);
                }
            } else if  (filter_type == "genre") {
                //Per ogni elemento della lista album, creo una card e la aggiungo in html
                for (var i = 0; i < album_list.length; i++) {
                    //Registro il valore dell'album sul Genere
                    var album_element = album_list[i].genre.toLowerCase();

                    if (album_element == filter_value){
                        makeCard(album_list[i]);
                    }
                }
            } else if  (filter_type == "author") {
                //Per ogni elemento della lista album, creo una card e la aggiungo in html
                for (var i = 0; i < album_list.length; i++) {
                    //Registro il valore dell'album sul Genere
                    var album_element = album_list[i].author.toLowerCase();

                    if (album_element == filter_value){
                        makeCard(album_list[i]);
                    }
                }
            } else if  (filter_type == "year") {
                //Per ogni elemento della lista album, creo una card e la aggiungo in html
                for (var i = 0; i < album_list.length; i++) {
                    //Registro il valore dell'album sul Genere
                    var album_element = album_list[i].year.toString();

                    if (album_element == filter_value){
                        makeCard(album_list[i]);
                    }
                }
            }
        },
        error : function() {
            alert("Il negozio è chiuso");
        }
    })
    })

})
//FUNZIONI
//Funzione per generare una card dal template, tramite handlebars
function makeCard(album_object) {
    var new_album = {
        url : album_object.poster,
        title : album_object.title,
        author : album_object.author,
        genre : album_object.genre,
        year : album_object.year
    }
    //Prendo il template
    var template_html = $("#card-template").html();
    var template_function = Handlebars.compile(template_html);
    var html_finale = template_function(new_album);
    $("#container-main").append(html_finale);
}
