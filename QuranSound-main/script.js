// Quran Sound Player - 114 Surahs

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            currentReciter = 'afs',
            reciterPaths = {
                'afs': 'https://server8.mp3quran.net/afs/',
                'saad_al_ghamdi': 'https://server7.mp3quran.net/s_gmd/',
                'abu_bakr_al_shatri': 'https://server11.mp3quran.net/shatri/',
                'mohammed_ayyub': 'https://server8.mp3quran.net/ayyub/',
                'mohammed_siddiq_al_minshawi': 'https://server10.mp3quran.net/minsh/',
                'mahmoud_khalil_al_hussary': 'https://server13.mp3quran.net/husr/',
                'mohammed_jibreel': 'https://server8.mp3quran.net/jbrl/',
                'saud_al_shuraim': 'https://server7.mp3quran.net/shur/',
                'mahmoud_ali_albanna': 'https://server8.mp3quran.net/bna/',
                'abdur_rahman_as_sudais': 'https://server11.mp3quran.net/sds/'
            },
            mediaPath = reciterPaths[currentReciter],
            extension = '.mp3',
            tracks = [
                {"track": 1, "name": "Al-Fatihah (The Opening)", "arabic": "الفاتحة", "duration": "0:00", "file": "001"},
                {"track": 2, "name": "Al-Baqarah (The Cow)", "arabic": "البقرة", "duration": "0:00", "file": "002"},
                {"track": 3, "name": "Ali 'Imran (Family of Imran)", "arabic": "آل عمران", "duration": "0:00", "file": "003"},
                {"track": 4, "name": "An-Nisa (The Women)", "arabic": "النساء", "duration": "0:00", "file": "004"},
                {"track": 5, "name": "Al-Ma'idah (The Table Spread)", "arabic": "المائدة", "duration": "0:00", "file": "005"},
                {"track": 6, "name": "Al-An'am (The Cattle)", "arabic": "الأنعام", "duration": "0:00", "file": "006"},
                {"track": 7, "name": "Al-A'raf (The Heights)", "arabic": "الأعراف", "duration": "0:00", "file": "007"},
                {"track": 8, "name": "Al-Anfal (The Spoils of War)", "arabic": "الأنفال", "duration": "0:00", "file": "008"},
                {"track": 9, "name": "At-Tawbah (The Repentance)", "arabic": "التوبة", "duration": "0:00", "file": "009"},
                {"track": 10, "name": "Yunus (Jonah)", "arabic": "يونس", "duration": "0:00", "file": "010"},
                {"track": 11, "name": "Hud", "arabic": "هود", "duration": "0:00", "file": "011"},
                {"track": 12, "name": "Yusuf (Joseph)", "arabic": "يوسف", "duration": "0:00", "file": "012"},
                {"track": 13, "name": "Ar-Ra'd (The Thunder)", "arabic": "الرعد", "duration": "0:00", "file": "013"},
                {"track": 14, "name": "Ibrahim (Abraham)", "arabic": "إبراهيم", "duration": "0:00", "file": "014"},
                {"track": 15, "name": "Al-Hijr (The Rocky Tract)", "arabic": "الحجر", "duration": "0:00", "file": "015"},
                {"track": 16, "name": "An-Nahl (The Bee)", "arabic": "النحل", "duration": "0:00", "file": "016"},
                {"track": 17, "name": "Al-Isra (The Night Journey)", "arabic": "الإسراء", "duration": "0:00", "file": "017"},
                {"track": 18, "name": "Al-Kahf (The Cave)", "arabic": "الكهف", "duration": "0:00", "file": "018"},
                {"track": 19, "name": "Maryam (Mary)", "arabic": "مريم", "duration": "0:00", "file": "019"},
                {"track": 20, "name": "Ta-Ha", "arabic": "طه", "duration": "0:00", "file": "020"},
                {"track": 21, "name": "Al-Anbiya (The Prophets)", "arabic": "الأنبياء", "duration": "0:00", "file": "021"},
                {"track": 22, "name": "Al-Hajj (The Pilgrimage)", "arabic": "الحج", "duration": "0:00", "file": "022"},
                {"track": 23, "name": "Al-Mu'minun (The Believers)", "arabic": "المؤمنون", "duration": "0:00", "file": "023"},
                {"track": 24, "name": "An-Nur (The Light)", "arabic": "النور", "duration": "0:00", "file": "024"},
                {"track": 25, "name": "Al-Furqan (The Criterion)", "arabic": "الفرقان", "duration": "0:00", "file": "025"},
                {"track": 26, "name": "Ash-Shu'ara (The Poets)", "arabic": "الشعراء", "duration": "0:00", "file": "026"},
                {"track": 27, "name": "An-Naml (The Ant)", "arabic": "النمل", "duration": "0:00", "file": "027"},
                {"track": 28, "name": "Al-Qasas (The Stories)", "arabic": "القصص", "duration": "0:00", "file": "028"},
                {"track": 29, "name": "Al-Ankabut (The Spider)", "arabic": "العنكبوت", "duration": "0:00", "file": "029"},
                {"track": 30, "name": "Ar-Rum (The Romans)", "arabic": "الروم", "duration": "0:00", "file": "030"},
                {"track": 31, "name": "Luqman", "arabic": "لقمان", "duration": "0:00", "file": "031"},
                {"track": 32, "name": "As-Sajdah (The Prostration)", "arabic": "السجدة", "duration": "0:00", "file": "032"},
                {"track": 33, "name": "Al-Ahzab (The Clans)", "arabic": "الأحزاب", "duration": "0:00", "file": "033"},
                {"track": 34, "name": "Saba (Sheba)", "arabic": "سبأ", "duration": "0:00", "file": "034"},
                {"track": 35, "name": "Fatir (The Originator)", "arabic": "فاطر", "duration": "0:00", "file": "035"},
                {"track": 36, "name": "Ya-Sin", "arabic": "يس", "duration": "0:00", "file": "036"},
                {"track": 37, "name": "As-Saffat (Those Ranged in Rows)", "arabic": "الصافات", "duration": "0:00", "file": "037"},
                {"track": 38, "name": "Sad", "arabic": "ص", "duration": "0:00", "file": "038"},
                {"track": 39, "name": "Az-Zumar (The Groups)", "arabic": "الزمر", "duration": "0:00", "file": "039"},
                {"track": 40, "name": "Ghafir (The Forgiver)", "arabic": "غافر", "duration": "0:00", "file": "040"},
                {"track": 41, "name": "Fussilat (Explained in Detail)", "arabic": "فصلت", "duration": "0:00", "file": "041"},
                {"track": 42, "name": "Ash-Shura (The Consultation)", "arabic": "الشورى", "duration": "0:00", "file": "042"},
                {"track": 43, "name": "Az-Zukhruf (The Gold)", "arabic": "الزخرف", "duration": "0:00", "file": "043"},
                {"track": 44, "name": "Ad-Dukhan (The Smoke)", "arabic": "الدخان", "duration": "0:00", "file": "044"},
                {"track": 45, "name": "Al-Jathiyah (The Crouching)", "arabic": "الجاثية", "duration": "0:00", "file": "045"},
                {"track": 46, "name": "Al-Ahqaf (The Wind-Curved Sandhills)", "arabic": "الأحقاف", "duration": "0:00", "file": "046"},
                {"track": 47, "name": "Muhammad", "arabic": "محمد", "duration": "0:00", "file": "047"},
                {"track": 48, "name": "Al-Fath (The Victory)", "arabic": "الفتح", "duration": "0:00", "file": "048"},
                {"track": 49, "name": "Al-Hujurat (The Rooms)", "arabic": "الحجرات", "duration": "0:00", "file": "049"},
                {"track": 50, "name": "Qaf", "arabic": "ق", "duration": "0:00", "file": "050"},
                {"track": 51, "name": "Adh-Dhariyat (The Winnowing Winds)", "arabic": "الذاريات", "duration": "0:00", "file": "051"},
                {"track": 52, "name": "At-Tur (The Mount)", "arabic": "الطور", "duration": "0:00", "file": "052"},
                {"track": 53, "name": "An-Najm (The Star)", "arabic": "النجم", "duration": "0:00", "file": "053"},
                {"track": 54, "name": "Al-Qamar (The Moon)", "arabic": "القمر", "duration": "0:00", "file": "054"},
                {"track": 55, "name": "Ar-Rahman (The Beneficent)", "arabic": "الرحمن", "duration": "0:00", "file": "055"},
                {"track": 56, "name": "Al-Waqi'ah (The Event)", "arabic": "الواقعة", "duration": "0:00", "file": "056"},
                {"track": 57, "name": "Al-Hadid (The Iron)", "arabic": "الحديد", "duration": "0:00", "file": "057"},
                {"track": 58, "name": "Al-Mujadila (The Disputation)", "arabic": "المجادلة", "duration": "0:00", "file": "058"},
                {"track": 59, "name": "Al-Hashr (The Exile)", "arabic": "الحشر", "duration": "0:00", "file": "059"},
                {"track": 60, "name": "Al-Mumtahanah (The Examined One)", "arabic": "الممتحنة", "duration": "0:00", "file": "060"},
                {"track": 61, "name": "As-Saff (The Ranks)", "arabic": "الصف", "duration": "0:00", "file": "061"},
                {"track": 62, "name": "Al-Jumu'ah (Friday)", "arabic": "الجمعة", "duration": "0:00", "file": "062"},
                {"track": 63, "name": "Al-Munafiqun (The Hypocrites)", "arabic": "المنافقون", "duration": "0:00", "file": "063"},
                {"track": 64, "name": "At-Taghabun (The Mutual Disillusion)", "arabic": "التغابن", "duration": "0:00", "file": "064"},
                {"track": 65, "name": "At-Talaq (The Divorce)", "arabic": "الطلاق", "duration": "0:00", "file": "065"},
                {"track": 66, "name": "At-Tahrim (The Prohibition)", "arabic": "التحريم", "duration": "0:00", "file": "066"},
                {"track": 67, "name": "Al-Mulk (The Sovereignty)", "arabic": "الملك", "duration": "0:00", "file": "067"},
                {"track": 68, "name": "Al-Qalam (The Pen)", "arabic": "القلم", "duration": "0:00", "file": "068"},
                {"track": 69, "name": "Al-Haqqah (The Reality)", "arabic": "الحاقة", "duration": "0:00", "file": "069"},
                {"track": 70, "name": "Al-Ma'arij (The Ascending Stairways)", "arabic": "المعارج", "duration": "0:00", "file": "070"},
                {"track": 71, "name": "Nuh (Noah)", "arabic": "نوح", "duration": "0:00", "file": "071"},
                {"track": 72, "name": "Al-Jinn (The Jinn)", "arabic": "الجن", "duration": "0:00", "file": "072"},
                {"track": 73, "name": "Al-Muzzammil (The Enshrouded One)", "arabic": "المزمل", "duration": "0:00", "file": "073"},
                {"track": 74, "name": "Al-Muddaththir (The Cloaked One)", "arabic": "المدثر", "duration": "0:00", "file": "074"},
                {"track": 75, "name": "Al-Qiyamah (The Resurrection)", "arabic": "القيامة", "duration": "0:00", "file": "075"},
                {"track": 76, "name": "Al-Insan (The Human)", "arabic": "الإنسان", "duration": "0:00", "file": "076"},
                {"track": 77, "name": "Al-Mursalat (The Emissaries)", "arabic": "المرسلات", "duration": "0:00", "file": "077"},
                {"track": 78, "name": "An-Naba (The Tidings)", "arabic": "النبأ", "duration": "0:00", "file": "078"},
                {"track": 79, "name": "An-Nazi'at (Those Who Drag Forth)", "arabic": "النازعات", "duration": "0:00", "file": "079"},
                {"track": 80, "name": "Abasa (He Frowned)", "arabic": "عبس", "duration": "0:00", "file": "080"},
                {"track": 81, "name": "At-Takwir (The Overthrowing)", "arabic": "التكوير", "duration": "0:00", "file": "081"},
                {"track": 82, "name": "Al-Infitar (The Cleaving)", "arabic": "الانفطار", "duration": "0:00", "file": "082"},
                {"track": 83, "name": "Al-Mutaffifin (The Defrauding)", "arabic": "المطففين", "duration": "0:00", "file": "083"},
                {"track": 84, "name": "Al-Inshiqaq (The Splitting Open)", "arabic": "الانشقاق", "duration": "0:00", "file": "084"},
                {"track": 85, "name": "Al-Buruj (The Constellations)", "arabic": "البروج", "duration": "0:00", "file": "085"},
                {"track": 86, "name": "At-Tariq (The Night-Comer)", "arabic": "الطارق", "duration": "0:00", "file": "086"},
                {"track": 87, "name": "Al-A'la (The Most High)", "arabic": "الأعلى", "duration": "0:00", "file": "087"},
                {"track": 88, "name": "Al-Ghashiyah (The Overwhelming)", "arabic": "الغاشية", "duration": "0:00", "file": "088"},
                {"track": 89, "name": "Al-Fajr (The Dawn)", "arabic": "الفجر", "duration": "0:00", "file": "089"},
                {"track": 90, "name": "Al-Balad (The City)", "arabic": "البلد", "duration": "0:00", "file": "090"},
                {"track": 91, "name": "Ash-Shams (The Sun)", "arabic": "الشمس", "duration": "0:00", "file": "091"},
                {"track": 92, "name": "Al-Layl (The Night)", "arabic": "الليل", "duration": "0:00", "file": "092"},
                {"track": 93, "name": "Ad-Duha (The Morning Hours)", "arabic": "الضحى", "duration": "0:00", "file": "093"},
                {"track": 94, "name": "Ash-Sharh (The Relief)", "arabic": "الشرح", "duration": "0:00", "file": "094"},
                {"track": 95, "name": "At-Tin (The Fig)", "arabic": "التين", "duration": "0:00", "file": "095"},
                {"track": 96, "name": "Al-Alaq (The Clot)", "arabic": "العلق", "duration": "0:00", "file": "096"},
                {"track": 97, "name": "Al-Qadr (The Power)", "arabic": "القدر", "duration": "0:00", "file": "097"},
                {"track": 98, "name": "Al-Bayyinah (The Evidence)", "arabic": "البينة", "duration": "0:00", "file": "098"},
                {"track": 99, "name": "Az-Zalzalah (The Earthquake)", "arabic": "الزلزلة", "duration": "0:00", "file": "099"},
                {"track": 100, "name": "Al-Adiyat (The Courser)", "arabic": "العاديات", "duration": "0:00", "file": "100"},
                {"track": 101, "name": "Al-Qari'ah (The Calamity)", "arabic": "القارعة", "duration": "0:00", "file": "101"},
                {"track": 102, "name": "At-Takathur (The Rivalry)", "arabic": "التكاثر", "duration": "0:00", "file": "102"},
                {"track": 103, "name": "Al-Asr (The Declining Day)", "arabic": "العصر", "duration": "0:00", "file": "103"},
                {"track": 104, "name": "Al-Humazah (The Traducer)", "arabic": "الهمزة", "duration": "0:00", "file": "104"},
                {"track": 105, "name": "Al-Fil (The Elephant)", "arabic": "الفيل", "duration": "0:00", "file": "105"},
                {"track": 106, "name": "Quraysh", "arabic": "قريش", "duration": "0:00", "file": "106"},
                {"track": 107, "name": "Al-Ma'un (The Small Kindnesses)", "arabic": "الماعون", "duration": "0:00", "file": "107"},
                {"track": 108, "name": "Al-Kawthar (The Abundance)", "arabic": "الكوثر", "duration": "0:00", "file": "108"},
                {"track": 109, "name": "Al-Kafirun (The Disbelievers)", "arabic": "الكافرون", "duration": "0:00", "file": "109"},
                {"track": 110, "name": "An-Nasr (The Help)", "arabic": "النصر", "duration": "0:00", "file": "110"},
                {"track": 111, "name": "Al-Masad (The Palm Fibre)", "arabic": "المسد", "duration": "0:00", "file": "111"},
                {"track": 112, "name": "Al-Ikhlas (The Sincerity)", "arabic": "الإخلاص", "duration": "0:00", "file": "112"},
                {"track": 113, "name": "Al-Falaq (The Daybreak)", "arabic": "الفلق", "duration": "0:00", "file": "113"},
                {"track": 114, "name": "An-Nas (The Mankind)", "arabic": "الناس", "duration": "0:00", "file": "114"}
            ],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackArabic = value.arabic,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li data-track-index="' + key + '"> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle"><span class="arabic-name">' + trackArabic + '</span> - ' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.html('<span class="arabic-name">' + tracks[id].arabic + '</span> - ' + tracks[id].name);
                index = id;
                // Format surah number to 3 digits (e.g., 1 -> "001", 114 -> "114")
                var surahNum = tracks[id].track.toString().padStart(3, '0');
                audio.src = mediaPath + surahNum + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            },
            changeReciter = function (reciterKey, reciterName) {
                currentReciter = reciterKey;
                mediaPath = reciterPaths[currentReciter];
                $('#reciterName').html('<span class="reciter-arabic">' + reciterName + '</span> <span class="dropdown-arrow">↓</span>');
                $('.reciter-option').removeClass('active');
                $('.reciter-option[data-reciter="' + reciterKey + '"]').addClass('active');
                $('#reciterDropdown').removeClass('show');
                // Reload current track with new reciter
                loadTrack(index);
            };
        
        // Reciter dropdown functionality
        $('#reciterName').on('click', function(e) {
            e.stopPropagation();
            $('#reciterDropdown').toggleClass('show');
        });
        
        $('.reciter-option').on('click', function() {
            var reciterKey = $(this).data('reciter');
            var reciterName = $(this).data('name');
            changeReciter(reciterKey, reciterName);
        });
        
        // Close dropdown when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('#reciterContainer').length) {
                $('#reciterDropdown').removeClass('show');
            }
        });
        
        // Set initial active reciter
        $('.reciter-option[data-reciter="' + currentReciter + '"]').addClass('active');
        
        // Search functionality
        $('#surahSearch').on('input', function() {
            var searchTerm = $(this).val().toLowerCase().trim();
            var $clearIcon = $('#clearSearch');
            var $searchIcon = $('.search-icon');
            
            if (searchTerm === '') {
                $('#plList li').removeClass('hidden');
                $clearIcon.hide();
                $searchIcon.show();
            } else {
                $clearIcon.show();
                $searchIcon.hide();
                $('#plList li').each(function() {
                    var $li = $(this);
                    var trackIndex = parseInt($li.data('track-index'));
                    var track = tracks[trackIndex];
                    var arabicName = track.arabic.toLowerCase();
                    var englishName = track.name.toLowerCase();
                    var trackNumber = track.track.toString();
                    
                    // Search in Arabic name, English name, or track number
                    if (arabicName.includes(searchTerm) || 
                        englishName.includes(searchTerm) || 
                        trackNumber.includes(searchTerm)) {
                        $li.removeClass('hidden');
                    } else {
                        $li.addClass('hidden');
                    }
                });
            }
        });
        
        // Clear search button
        $('#clearSearch').on('click', function() {
            $('#surahSearch').val('').trigger('input');
            $('#surahSearch').focus();
        });
        
        // Clear search on Escape key
        $('#surahSearch').on('keydown', function(e) {
            if (e.key === 'Escape') {
                $(this).val('').trigger('input');
            }
        });
        
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});
