// Função para inicializar o mapa
function initialize() {
    // Opções do mapa
    var mapOptions = {
        // Zoom inicial do mapa
        zoom: 10,
        // Coordenadas iniciais no centro (Nova Iorque)
        center: new google.maps.LatLng(40.7128, -74.0060),
        // Tipo de mapa (ROADMAP, SATELLITE, HYBRID, TERRAIN)
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // Zoom mínimo do mapa
        minZoom: 2
    };

    // Cria uma nova instância de mapa usando as opções fornecidas
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Cria uma janela de informações para exibir detalhes da localização
    var infoWindow = new google.maps.InfoWindow();

    // Cria um marcador, por exemplo: Irã, Zanjan
    var marker = new google.maps.Marker({
        // Coordenadas para Irã, Zanjan
        position: new google.maps.LatLng(36.6769, 48.4963),
        // Anexa o marcador ao mapa
        map: map,
        // Dica ao passar o mouse sobre o marcador
        title: 'Irã, Zanjan'
    });

    // Adiciona um ouvinte de evento de clique para o marcador
    marker.addListener('click', function () {
        infoWindow.setContent(marker.title);
        infoWindow.open(map, marker);
    });

    // Ajusta o centro do mapa quando a janela é redimensionada
    google.maps.event.addDomListener(window, "resize", function () {
        map.setCenter(mapOptions.center);
    });
}

// Inicializa o mapa quando o carregamento da janela é concluído
google.maps.event.addDomListener(window, 'load', initialize);
