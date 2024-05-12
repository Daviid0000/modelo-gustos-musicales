            const calificaciones = document.getElementById("calificaciones")
            let total_calificiones = tf.tensor([]);
            
            calificaciones.addEventListener('click', () => {
                let user = [document.getElementById('user').value]
                
                
                console.log("usuarios:", user)
                if (user == "") {
                    console.log("Ingrese un nombre de usuario")
                } else {
                    console.log("un usuario:", user)
                    const tabla_1 = document.getElementById('tabla-1')
                    const tabla_2 = document.getElementById('tabla-2')
                    const user1 = document.getElementById('user1')
                    const CAL_1 = parseInt(document.getElementById('cal1').value)
                    const CAL_2 = parseInt(document.getElementById('cal2').value)
                    const CAL_3 = parseInt(document.getElementById('cal3').value)
                    const CAL_4 = parseInt(document.getElementById('cal4').value)
                    const CAL_5 = parseInt(document.getElementById('cal5').value)
                    const CAL_6 = parseInt(document.getElementById('cal6').value)
                    const CAL_7 = parseInt(document.getElementById('cal7').value)

                    const t_cal1 = tf.tensor([CAL_1])
                    const t_cal2 = tf.tensor([CAL_2])
                    const t_cal3 = tf.tensor([CAL_3])
                    const t_cal4 = tf.tensor([CAL_4])
                    const t_cal5 = tf.tensor([CAL_5])
                    const t_cal6 = tf.tensor([CAL_6])
                    const t_cal7 = tf.tensor([CAL_7])

                    document.getElementById('user').value = ""
                    document.getElementById('cal1').value = ""
                    document.getElementById('cal2').value = ""
                    document.getElementById('cal3').value = ""
                    document.getElementById('cal4').value = ""
                    document.getElementById('cal5').value = ""
                    document.getElementById('cal6').value = ""
                    document.getElementById('cal7').value = ""

                    tabla_1.style.display = 'none'
                    tabla_2.style.display = 'flex'
                    user1.style.backgroundColor = '#2231'
                    user1.style.padding = '5px'
                    user1.style.fontSize = '25px'
                    user1.textContent = user

                    let votos = tf.concat([t_cal1, t_cal2, t_cal3, t_cal4, t_cal5, t_cal6, t_cal7])
                    votos2 = tf.tensor2d(votos.arraySync(), [1, 7])
                    votos2.print()

                    const gusto_musical = tf.tensor([
                        [1, 1, 0, 0, 0, 0],
                        [1, 0, 1, 0, 0, 0],
                        [0, 0, 0, 1, 1, 0],
                        [0, 0, 0, 1, 0, 0],
                        [0, 0, 1, 0, 0, 1],
                        [0, 0, 1, 0, 0, 1],
                        [1, 1, 0, 0, 0, 0],
                    ])

                    const estilos = [
                        'Grunge',
                        'Rock',
                        'Industrial',
                        'Boy Band',
                        'Dance',
                        'Techno',
                    ]

                    const preferencias = tf.matMul(votos2, gusto_musical)
                    console.log("preferencias:")
                    preferencias.print()

                    const sumTotal = preferencias.sum().arraySync();

                    let preferenciasNormalizadas = preferencias.div(sumTotal);
                    let redondeo = preferenciasNormalizadas.mul(100).arraySync().map((row) => row.map((value) => Math.round(value)));
                    console.log("redondeo",redondeo)
                    
                    const elPreferencias = document.getElementById('preferencias')

                    for (let i = 0; i < estilos.length; i++) {
                        let pfca = document.createElement('div')

                        let results = `${redondeo[0][i]}%`;
                        
                        pfca.textContent = results

                        pfca.style.fontSize = '25px'
                        pfca.style.backgroundColor = '#2231'
                        pfca.style.padding = '2px'
                        pfca.style.margin = '4px'

                        elPreferencias.appendChild(pfca)
                    }

                    console.log("Preferencias normalizadas:");
                    preferenciasNormalizadas.print();
                    
                    const gustos = tf.topk(preferencias, estilos.length)
                    console.log("gustos musicales:", gustos)

                    const indice_estilo_musical = gustos.indices.arraySync()
                    console.log("Indice de gusto musical:", indice_estilo_musical)

                    user.map((u, i) => {
                        generos_categorizados = indice_estilo_musical[i].map((v) => estilos[v])
                        console.log("Usuarios:", u, " género musical preferido:", generos_categorizados)
                    })
                }    
            })
