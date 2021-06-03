function appelAPI() {
	let CLEFAPI = '22ceda9c34ccc116d954bedd263d2479829d021c';
	let url = `https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=${CLEFAPI}`;

	$(document).ready(function () {
		$.get(url, function (data) {
			// console.log(data);
			for (let i = 0; i < data.length; i++) {
				let markers = data[i];
				const marker = new google.maps.Marker({
					position: markers.position,
					map: map,
				});
				// affichage popup
				const contentString =
					'<div id="content">' +
					'<h1 id="firstHeading" class="firstHeading h3">' +
					markers.name +
					'</h1>' +
					'<div id="bodyContent">' +
					'<ul>' +
					'<li>Vélo disponibles :' +
					markers.available_bikes +
					'</li>' +
					'<li>Places disponibles :' +
					markers.available_bike_stands +
					'</li>' +
					'</ul>' +
					'<input type="submit" id="reservation" class="btn btn-primary btn-sm" value="Réserver">' +
					'</div>' +
					'</div>';
				const infowindow = new google.maps.InfoWindow({
					content: contentString,
				});

				marker.addListener('click', () => {
					infowindow.open(map, marker);
				});

				// bouton pour réserver (ne fonctionne pas)
				let reservation = document.getElementById('reservation');
				if (reservation != null) {
					reservation.addListener('submit', () => {
						console.log('réservation');
					});
				}

				// $('#reservation').submit(function () {
				//     console.log('réservation');
				// });
				// $('#reservation').on('click', function () {
				// 	console.log('réservation');
				// });
			}
		});
	});
}

let map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 45.764043, lng: 4.835659 },
		zoom: 15,
	});

	appelAPI();
}
