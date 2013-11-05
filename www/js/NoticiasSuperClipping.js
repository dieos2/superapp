function CarregaNoticias(sigla, caminho, id_tipoMidia) {
debugger;
			
			var oTable = jQuery('#galeria').dataTable({
               
                "bServerSide": true,
                "sAjaxSource": "http://www.superclipping.com.br/Noticias/DataTableMidiasAnalisadasDaInstituicao/?sigla=" + sigla+"&id_tipo="+id_tipoMidia,
                "aaSorting": [[0, "desc"]],
                "aoColumns": [

					{ "sTitle": 'Veiculo', "mData": "nome_veiculo" },
                     {
                         "sTitle": "Titulo", "mData": function (source, type, val) {
                             var data = [];
                             data.push(source.id, source.titulo);
                             return data;
                         },
                         "mRender": function (data, type, full) { return "<a class='btnDetalhes' data-id='"+data[0]+"'>" + data[1] + "</a>"  }
                     },

                    { "sTitle": "Recebido", "mData": "data_midia", "mRender": function (data, type, full) { var d = (new Date(parseInt(data.substr(6)))).toLocaleDateString(); return d; } },

                     
                ],
                "bAutoWidth": false,
                "bLengthChange": true,
                "iDisplayLength": 25,
                "sPaginationType": "full_numbers",
                "fnInitComplete": function (oSettings) {
				debugger;
				
				}
            }); 
setTimeout(function(){
	jQuery("#galeria_filter").after(
				"<div id='' style='height: 22px;' class='dataTables_length'><div style='float:right'> <label style='font-size:16px'>Filtro: <select style='width:153px !important' data-id='selectTipo'></select></label></div></div>")
                CarregaSelect(id_tipoMidia)}, 1000   )


}
function DataTableDinamic(sigla, caminho, id_tipoMidia)
{
 
}
function CarregaSelect(id_tipoMidia)
{

	
 jQuery.ajax({
        url: "http://www.superclipping.com.br/Noticias/GetTiposMidias",
        type: "Get",
		async:false,
        success: function (result) {

            for (var i = 0; result.length > i; i++) {
			
              $("[data-id=selectTipo]").append(
                            $('<option>', { value: result[i].id }).text(result[i].tipo_midia)
                          )

                   }
			    $("[data-id=selectTipo] option[value='"+id_tipoMidia+"']").attr("selected", "selected");
	
            
}
});
}
function CarregaDatalheNoticias(id) {
    jQuery.ajax({
        url: "http://www.superclipping.com.br/Noticias/GetDetalhesMidia/" + id,
        type: "Get",
        success: function (result) {
		result.texto = result.texto.replace(/\n/g, '<br /><br />');
            jQuery("[data-id=tituloMidia]").html(result.titulo);
            jQuery("[data-id=corpoMidia]").html(result.texto);
            jQuery("[data-id=dataMidia]").html(moment(new Date(parseInt(result.data_midia.substr(6)))).format('DD/MM/YYYY'));
			jQuery("[data-id=veiculo]").html(result.nome_veiculo);
			
			CarregaBtnFacebook(id, result.titulo, result.texto);
			CarregaListaDeOutrasMidias(result.id_veiculo,result.id,'secom',result.id_tipomidia)
        }
    });
}
function CarregaListaDeOutrasMidias(id_veiculo,id_midia,sigla,id_tipo)
{

 jQuery.ajax({
        url: "http://www.superclipping.com.br/Noticias/GetListaDoVeiculo/?id_veiculo=" + id_veiculo+"&id_midia="+id_midia+"&sigla="+sigla+"&id_tipo="+id_tipo,
        type: "Get",
        success: function (result) {
		var corpo = '';
		
		for(var i = 0;result.lista.length > i;i++)
		{
		if(i < 10){
		corpo = corpo +'<li> <a class="btnDetalhes" data-id="'+result.lista[i].id_midia+'"  href="#">'+ moment(new Date(parseInt(result.lista[i].data_midia.substr(6)))).format('D/M/YYYY') + ' - '+result.lista[i].titulo +'</a></li>';
		}
		}
            jQuery("[data-id=listoutras]").html(corpo);
          		
		}
        
    });
}
//
function CarregaBtnFacebook(id, titulo, texto){
$(".btnDonload").after('<div class="fb-like" data-href="http://www.agenciapara.com.br/clipping/clipping'+id+'.html" data-width="The pixel width of the plugin" data-height="The pixel height of the plugin" data-colorscheme="light" data-layout="button_count" data-action="like" data-show-faces="true" data-send="false"></div>')
.after("<a style='margin: 0 30px 0 0' href='#' id='fb_like' class='fb-share' onclick='window.open(\"https://www.facebook.com/sharer/sharer.php?u=\"+encodeURIComponent(\"http://agenciapara.com.br/clipping/clipping"+id+".html\"), \"facebook-share-dialog\", \"width=626,height=436\"); return false;'><img src='/imagens/compartilhar_facebook.png'></a>")
.after('<a href="https://twitter.com/share" data-text="'+titulo+'" data-via="AgenciaPara" data-counturl="http://www.agenciapara.com.br/clipping/exibe_clipping.asp?id='+id+'" data-url="http://www.agenciapara.com.br/clipping/clipping'+id+'.html" class="twitter-share-button" data-lang="en">Tweet</a>'+
'<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>');
		

$('body').prepend('<div id="fb-root"></div>'+
'<script>(function(d, s, id) {'+
 ' var js, fjs = d.getElementsByTagName(s)[0];'+
  'if (d.getElementById(id)) return;'+
  'js = d.createElement(s); js.id = id;'+
 ' js.src = "//connect.facebook.net/pt_BR/all.js#xfbml=1&appId=619256671445990";'+
'  fjs.parentNode.insertBefore(js, fjs);'+
'}(document, "script", "facebook-jssdk"));</script>');

}
function CarregaDadosAnexoMidia(id) {
    jQuery.ajax({
        url: "http://www.superclipping.com.br/Noticias/GetDetalhesAnexoMidia/" + id,
        type: "Get",
        success: function (result) {
            if (result.anexo) {
              
			 
			   jQuery("#divmidia").show();
			 
                jQuery("[data-id=linkMidia]").attr("href", "http://www.superclipping.com.br/Uploads/" + result.midia.tipo_midia + "/" + moment(new Date(parseInt(result.midia.data_midia.substr(6)))).format('DD.MM.YYYY') + "/" + result.midia.nome_anexo).attr("download", result.midia.nome_anexo);
                if (result.midia.tipo_midia == "audio") {
                    var caminhaMidia = "http://www.superclipping.com.br/Uploads/" + result.midia.tipo_midia + "/" + moment(new Date(parseInt(result.midia.data_midia.substr(6)))).format('DD.MM.YYYY') + "/" + result.midia.nome_anexo;
                    CarregPlayDeAudio(caminhaMidia);
                }
                else if (result.midia.tipo_midia == "video") {
                    var caminhaMidia = "http://www.superclipping.com.br/Uploads/" + result.midia.tipo_midia + "/" + moment(new Date(parseInt(result.midia.data_midia.substr(6)))).format('DD.MM.YYYY') + "/" + result.midia.nome_anexo;
                    CarregPlayDeVideo(caminhaMidia);
                }
                else
                {
                    var caminhaMidia = "http://www.superclipping.com.br/Uploads/" + result.midia.tipo_midia + "/" + moment(new Date(parseInt(result.midia.data_midia.substr(6)))).format('DD.MM.YYYY') + "/" + result.midia.nome_anexo;
                    CarregaImagem(caminhaMidia);
                }
            }else{
			 jQuery("[data-id=linkMidia]").hide();
			   jQuery("#divmidia").hide();
			   jQuery("#divtexto").show();
			    jQuery("[data-id=corpoMidia]").show();
			}

        }
    });
}

function CarregPlayDeAudio(midia) {

    var play = '<div id="jquery_jplayer_1" class="jp-jplayer "></div>' +
      '<div id="jp_container_1" style="margin:0" class="jp-audio hidden">' +
        '<div class="jp-type-single">' +
          '<div class="jp-gui jp-interface">' +
            '<ul class="jp-controls">' +
              '<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>' +
              '<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>' +
              '<li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li>' +
              '<li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li>' +
              '<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li>' +
              '<li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">max volume</a></li>' +
            '</ul>' +
            '<div class="jp-progress">' +
              '<div class="jp-seek-bar">' +
                '<div class="jp-play-bar"></div>' +
              '</div>' +
            '</div>' +
            '<div class="jp-volume-bar">' +
              '<div class="jp-volume-bar-value"></div>' +
            '</div>' +
            '<div class="jp-time-holder">' +
              '<div class="jp-current-time"></div>' +
              '<div class="jp-duration"></div>' +
              '<ul class="jp-toggles">' +
                '<li><a href="javascript:;" class="jp-repeat" tabindex="1" title="repeat">repeat</a></li>' +
                '<li><a href="javascript:;" class="jp-repeat-off" tabindex="1" title="repeat off">repeat off</a></li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
         '<div class="jp-no-solution">' +
            '<span>Update Required</span>' +
            'To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.' +
 '</div>' +
'</div>' +
'</div>';
    jQuery("[data-id=playMidia]").append(play);

    jQuery("#jp_container_1").removeClass("hidden");
    jQuery("#jquery_jplayer_1").jPlayer({
        ready: function () {
            jQuery(this).jPlayer("setMedia", {
                mp3: midia

            });
        },
        swfPath: "/Scripts/jQuery.jPlayer.2.4.0/",
        supplied: "mp3"
    });
}
function CarregPlayDeVideo(midia) {
    var play =
                            '<div id="jp_container_1"  class="jp-video hidden">' +
                                '<div class="jp-type-single">' +
                                    '<div id="jquery_jplayer_1" class="jp-jplayer"></div>' +
                                    '<div class="jp-gui">' +
                                        '<div class="jp-video-play">' +
    '<a href="javascript:;" class="jp-video-play-icon" tabindex="1">Play</a>' +
    '</div>' +
    '<div class="jp-interface">' +
    '<div class="jp-progress">' +
    '<div class="jp-seek-bar">' +
    '<div class="jp-play-bar"></div>' +
    '</div>' +
    '</div>' +
    '<div class="jp-current-time"></div>' +
    '<div class="jp-duration"></div>' +
    '<div class="jp-controls-holder">' +
    '<ul class="jp-controls">' +
    '<li><a href="javascript:;" class="jp-play" tabindex="1">Reproduzir</a></li>' +
    '<li><a href="javascript:;" class="jp-pause" tabindex="1">Pausa</a></li>' +
    '<li><a href="javascript:;" class="jp-stop" tabindex="1">Parar</a></li>' +
    '<li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">Mudo</a></li>' +
    '<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">Som</a></li>' +
    '<li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">Volume máximo</a></li>' +
    '</ul>' +
    '<div class="jp-volume-bar">' +
    '<div class="jp-volume-bar-value"></div>' +
    '</div>' +
    '<ul class="jp-toggles">' +
    '<li><a href="javascript:;" class="jp-full-screen" tabindex="1" title="full screen">Tela cheia</a></li>' +
    '<li><a href="javascript:;" class="jp-restore-screen" tabindex="1" title="restore screen">Tela normal</a></li>' +
    '<li><a href="javascript:;" class="jp-repeat" tabindex="1" title="repeat">Repetir</a></li>' +
    '<li><a href="javascript:;" class="jp-repeat-off" tabindex="1" title="repeat off">Repetir desligado</a></li>' +
    '</ul>' +
    '</div>' +

    '</div>' +
    '</div>' +
    '<div class="jp-no-solution">' +
    '<span>Atualização necessária</span>' +
    'Para reproduzir o vídeo você precisa atualizar seu navegador ou o <a href="http://get.adobe.com/flashplayer/" target="_blank">plugin do Flash</a>.' +
    '</div>' +
'</div>' +
'</div>';
    jQuery("[data-id=playMidia]").append(play);
    jQuery("#jp_container_1").removeClass("hidden");
    jQuery("#jquery_jplayer_1").jPlayer("clearMedia");
    jQuery("#jquery_jplayer_1").jPlayer("destroy");
    jQuery("#jquery_jplayer_1").jPlayer({
        ready: function () {
            var recebeocaminho = midia;

            jQuery(this).jPlayer("setMedia", {
                m4v: midia

            });
        },
        swfPath: "/Scripts/jQuery.jPlayer.2.4.0/",
        supplied: "m4v"
    });
}
function CarregaImagem(midia) {
    var play = "<img style='max-width: 97%;' src=" + midia+"></img>";
    jQuery("[data-id=playMidia]").append(play);
}
  function LimpaDataTables() {
            $("#galeria").each(function () {
                $(this).dataTable().fnDestroy();
            });
        }