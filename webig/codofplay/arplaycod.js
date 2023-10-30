 var art = new Artplayer({
            container: '#artplayer-app',
            url: video_playlist[0].link,
            poster: video_playlist[0].poster,
            setting: true, // habilita el panel de configuración
            flip: true, // habilita el control de voltear el video
              settings: [
        {
            width: 200,
            html: 'Subtitle',
            tooltip: 'Bilingual',
            icon: '<img width="22" heigth="22" src="https://www.artplayer.org/assets/img/subtitle.svg">',
            selector: [
                {
                    html: 'Display',
                    tooltip: 'Show',
                    switch: true,
                    onSwitch: function (item) {
                        item.tooltip = item.switch ? 'Hide' : 'Show';
                        art.subtitle.show = !item.switch;
                        return !item.switch;
                    },
                },
                {
                    default: true,
                    html: 'Bilingual',
                    url: 'https://www.artplayer.org/assets/sample/subtitle.srt',
                },
                {
                    html: 'Chinese',
                    url: 'https://www.artplayer.org/assets/sample/subtitle.cn.srt',
                },
                {
                    html: 'Japanese',
                    url: 'https://www.artplayer.org/assets/sample/subtitle.jp.srt',
                },
            ],
            onSelect: function (item) {
                art.subtitle.switch(item.url, {
                    name: item.html,
                });
                return item.html;
            },
        },
        {
            html: 'Switcher',
            icon: '<img width="22" heigth="22" src="https://www.artplayer.org/assets/img/state.svg">',
            tooltip: 'OFF',
            switch: false,
            onSwitch: function (item) {
                item.tooltip = item.switch ? 'OFF' : 'ON';
                console.info('You clicked on the custom switch', item.switch);
                return !item.switch;
            },
        },
        {
            html: 'Slider',
            icon: '<img width="22" heigth="22" src="https://www.artplayer.org/assets/img/state.svg">',
            tooltip: '5x',
            range: [5, 1, 10, 0.1],
            onRange: function (item) {
                return item.range + 'x';
            },
        },
    ],
              layers: [
        {
            html: '<img width="30" src="https://render.fineartamerica.com/images/rendered/default/poster/7/8/break/images/artworkimages/medium/2/south-park-oisam.jpg">',
            click: function () {
                window.open('https://aimu.app');
                console.info('You clicked on the custom layer');
            },
            style: {
                position: 'absolute',
                top: '20px',
                right: '20px',
                opacity: '.4',
            },
        },
    ],
              icons: {
        loading: '<img src="https://img1.picmix.com/output/stamp/normal/7/5/6/0/2080657_ed868.gif">',
        state: '<img width="150" heigth="150" src="https://www.artplayer.org/assets/img/state.svg">',
        indicator: '<img width="25" heigth="25" src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c3de.png">',
    },
              hotkey: true,
              //screenshot: true,
              autoplay: true,
              volume: 0.9,
              fullscreen: true,
                fullscreenWeb: true,
                  miniProgressBar: true,
                    playsInline: true,
            playbackRate: true, // habilita el control de la velocidad de reproducción
            aspectRatio: true, // habilita el control de la relación de aspecto
            subtitleOffset: true, // habilita el control del desplazamiento de los subtítulos
              
            // puedes agregar más opciones según tus preferencias
        });
art.on('ready', () => {
    art.notice.show = 'hola';
})
        var playlist = document.querySelector('#playlist');
        video_playlist.forEach(function(video){
            var li = document.createElement('li');
            li.setAttribute('movieurl', video.link);
            li.setAttribute('moviesposter', video.poster);
            li.textContent = video.name;
            playlist.appendChild(li);
        });

        var playlistItems = document.querySelectorAll('#playlist li');
        playlistItems.forEach(function(item){
            item.addEventListener('click', function(){
                art.switchUrl(item.getAttribute('movieurl'), item.getAttribute('moviesposter'));
            });
        });
