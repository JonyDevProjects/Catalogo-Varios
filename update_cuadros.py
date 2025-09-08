#!/usr/bin/env python3
import json

# Leer el archivo JSON actual
with open('Articulos.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Nuevos cuadros y actualizaciones basados en el HTML
nuevos_cuadros = {
    "cuadro5": {
        "id": "cuadro5",
        "categoria": "Cuadro",
        "titulo": "Cuadro 5: Virgen de Fuensalida",
        "descripcion": "Óleo religioso del siglo XX, representación de la Virgen.",
        "autor": "N/A",
        "tecnica": "Óleo",
        "medidas": "Consultar",
        "precio": 0,
        "imagenes": ["imagenes_jpg/Cuadro5.jpg", "imagenes_jpg/Cuadro5_1.jpg"],
        "alt": "Virgen de Fuensalida - Óleo religioso",
        "adUrl": "https://es.wallapop.com/item/cuadro-virgen-fuensalila-oleo-s-xx-1165952653",
        "reservado": False
    },
    "cuadro24": {
        "id": "cuadro24",
        "categoria": "Cuadro",
        "titulo": "Cuadro 24: Acuarela",
        "descripcion": "Composición en acuarela de temática urbana.",
        "autor": "J.Carmona",
        "tecnica": "Acuarela",
        "medidas": "51 x 43 cm",
        "precio": 20,
        "imagenes": ["imagenes_jpg/Cuadro24.jpg", "imagenes_jpg/Cuadro24_1.jpg"],
        "alt": "Acuarela de J. Carmona",
        "adUrl": "https://es.wallapop.com/item/acuarela-urbana-enmarcada-1166133591",
        "reservado": True
    },
    "cuadro25": {
        "id": "cuadro25",
        "categoria": "Cuadro",
        "titulo": "Cuadro 25: Óleo sobre lienzo con espátula",
        "descripcion": "Paisaje campestre realizado con técnica de espátula.",
        "autor": "N/A",
        "tecnica": "Óleo sobre lienzo con espátula",
        "medidas": "Consultar",
        "precio": 0,
        "imagenes": ["imagenes_jpg/Cuadro25.jpg", "imagenes_jpg/Cuadro25_1.jpg"],
        "alt": "Paisaje campestre con espátula",
        "adUrl": "https://es.wallapop.com/item/oleo-sobre-lienzo-con-espatula-paisaje-campestre-1166134636",
        "reservado": False
    }
}

# Actualizaciones de cuadros existentes
actualizaciones = {
    "cuadro2": {
        "titulo": "Cuadro 2: Acuarela",
        "descripcion": "Escena urbana sevillana con edificios emblemáticos.",
        "autor": "Manuel Matey Bande",
        "tecnica": "Acuarela",
        "medidas": "50.5 x 42.5 cm",
        "precio": 20
    },
    "cuadro4": {
        "titulo": "Cuadro 4: Vista de calle Padre Damian",
        "descripcion": "Escena urbana con técnica de puntillismo.",
        "autor": "Aureliano Juarez",
        "tecnica": "Puntillismo",
        "medidas": "63 x 52 cm",
        "precio": 15
    },
    "cuadro6": {
        "titulo": "Cuadro 6: Flores",
        "descripcion": "Bodegón floral con composición equilibrada.",
        "autor": "PacoToro",
        "tecnica": "Óleo en Lienzo",
        "medidas": "70.5 x 71.5 cm",
        "precio": 150,
        "precioDes": "150€ (individual) / 200€ (el par)"
    },
    "cuadro7": {
        "titulo": "Cuadro 7: Flores",
        "descripcion": "Bodegón floral, pieza compañera del cuadro 6.",
        "autor": "PacoToro",
        "tecnica": "Óleo en Lienzo",
        "medidas": "70.5 x 71.5 cm",
        "precio": 150,
        "precioDes": "150€ (individual) / 200€ (el par)"
    },
    "cuadro8": {
        "titulo": "Cuadro 8: Oleo en Lienzo",
        "descripcion": "Vista del muelle con barcos atracados.",
        "autor": "Segrelles",
        "tecnica": "Óleo en Lienzo",
        "medidas": "54 x 62 cm",
        "precio": 100
    },
    "cuadro9": {
        "titulo": "Cuadro 9: Oleo sobre tabla",
        "descripcion": "Composición clásica de corte tradicional.",
        "autor": "Arellano",
        "tecnica": "Óleo sobre tabla",
        "medidas": "50 x 58 cm",
        "precio": 60
    },
    "cuadro10": {
        "titulo": "Cuadro 10: Oleo sobre tabla",
        "descripcion": "Paisaje figurativo con gran riqueza cromática.",
        "autor": "J.M.Liñan",
        "tecnica": "Óleo sobre tabla",
        "medidas": "76.2 x 64.5 cm",
        "precio": 70
    },
    "cuadro11": {
        "titulo": "Cuadro 11: Oleo sobre lienzo",
        "descripcion": "Marina/ paisaje con pincelada suelta.",
        "autor": "A.Marcos",
        "tecnica": "Óleo sobre lienzo",
        "medidas": "66.7 x 75.5 cm",
        "precio": 100
    },
    "cuadro12": {
        "titulo": "Cuadro 12: Oleo sobre Lienzo",
        "descripcion": "Muelle de desguace de barcos en Chipiona, Cádiz.",
        "autor": "Nuñes Vaya",
        "tecnica": "Óleo en Lienzo",
        "medidas": "67.8 x 55 cm",
        "precio": 100
    },
    "cuadro13": {
        "titulo": "Cuadro 13: Papiro Egipcio enmarcado",
        "descripcion": "Motivo egipcio tradicional sobre papiro.",
        "autor": "N/A",
        "tecnica": "Papiro enmarcado entre cristales",
        "medidas": "64.7 x 52.5 cm",
        "precio": 50
    },
    "cuadro14": {
        "titulo": "Cuadro 14: Oleo sobre lienzo",
        "descripcion": "Vista de puerto con barcos y cielo abierto.",
        "autor": "Desconocido",
        "tecnica": "Óleo sobre lienzo",
        "medidas": "55.5 x 63.5 cm",
        "precio": 100
    },
    "cuadro15": {
        "titulo": "Cuadro 15: Oleo sobre tabla",
        "descripcion": "Composición figurativa de estética clásica.",
        "autor": "Liscarinci",
        "tecnica": "Óleo sobre tabla",
        "medidas": "70 x 80 cm",
        "precio": 70
    },
    "cuadro16": {
        "titulo": "Cuadro 16: Oleo sobre lienzo",
        "descripcion": "Patio tradicional canario con arquitectura vernácula.",
        "autor": "Galán",
        "tecnica": "Óleo sobre lienzo",
        "medidas": "86 x 73 cm",
        "precio": 70
    },
    "cuadro17": {
        "titulo": "Cuadro 17: Mosaico enmarcado",
        "descripcion": "Motivo decorativo en mosaico con inspiración clásica.",
        "autor": "N/A",
        "tecnica": "Mosaico",
        "medidas": "34.2 x 20 cm",
        "precio": 10
    },
    "cuadro18": {
        "titulo": "Cuadro 18: Punto de cruz enmarcado",
        "descripcion": "Motivo textil artesanal con marco.",
        "autor": "N/A",
        "tecnica": "Punto de cruz",
        "medidas": "37.7 x 27.8 cm",
        "precio": 5,
        "reservado": True
    },
    "cuadro19": {
        "titulo": "Cuadro 19: Puerto de Sevilla",
        "descripcion": "Edificio de Aduanas y Elcano en el puerto.",
        "autor": "N/A",
        "tecnica": "N/A",
        "medidas": "48.5 x 57.5 cm",
        "precio": 150
    },
    "cuadro20": {
        "titulo": "Cuadro 20: Anciano Balines",
        "descripcion": "Retrato costumbrista con técnica mixta.",
        "autor": "Firmado",
        "tecnica": "Mixta (óleo sobre vegetales)",
        "medidas": "42.2 x 52.5 cm",
        "precio": 10,
        "reservado": True
    },
    "cuadro21": {
        "titulo": "Cuadro 21: Lámina de grabado",
        "descripcion": "La Torre del Oro, icono de Sevilla, en grabado.",
        "autor": "Firmado",
        "tecnica": "Grabado",
        "medidas": "35.8 x 26 cm",
        "precio": 15
    },
    "cuadro22": {
        "titulo": "Cuadro 22: Lámina de grabado",
        "descripcion": "El Cachorro cruzando el Puente de Triana.",
        "autor": "Juan Maria Sanchez",
        "tecnica": "Grabado (Ejemplar 14/125)",
        "medidas": "43.5 x 33.5 cm",
        "precio": 30
    },
    "cuadro23": {
        "titulo": "Cuadro 23: Acuarela",
        "descripcion": "Patio sevillano con vegetación y azulejos.",
        "autor": "Manuel Matey Bande",
        "tecnica": "Acuarela",
        "medidas": "42.5 x 50.5 cm",
        "precio": 25
    },
    "cuadro26": {
        "titulo": "Cuadro 26: Seda balinesa",
        "descripcion": "Escena balinesa con motivos tradicionales.",
        "autor": "N/A",
        "tecnica": "Seda balinesa",
        "medidas": "44.2 x 41 cm",
        "precio": 25
    },
    "cuadro27": {
        "titulo": "Cuadro 27: Grabado",
        "descripcion": "Lance taurino en aguafuerte y aguatinta.",
        "autor": "N/A",
        "tecnica": "Grabado",
        "medidas": "44.5 x 34 cm",
        "precio": 50
    },
    "cuadro28": {
        "titulo": "Cuadro 28: Alegoría en seda balinesa",
        "descripcion": "Escena alegórica con motivos balineses.",
        "autor": "N/A",
        "tecnica": "Seda balinesa",
        "medidas": "44 x 41 cm",
        "precio": 30
    },
    "cuadro29": {
        "titulo": "Cuadro 29: Óleo en tabla",
        "descripcion": "Escena costera con figuras femeninas.",
        "autor": "Sinova",
        "tecnica": "Óleo en tabla",
        "medidas": "34.5 x 29.5 cm",
        "precio": 25,
        "reservado": True
    },
    "cuadro30": {
        "titulo": "Cuadro 30: Anciano Balines",
        "descripcion": "Retrato balinés en técnica mixta.",
        "autor": "Firmado",
        "tecnica": "Mixta (óleo sobre vegetales)",
        "medidas": "37 x 32.7 cm",
        "precio": 15
    },
    "cuadro31": {
        "titulo": "Cuadro 31: Flores",
        "descripcion": "Bodegón floral sobre cobre.",
        "autor": "H.Hooter",
        "tecnica": "Óleo sobre cobre",
        "medidas": "42 x 37 cm",
        "precio": 40
    },
    "cuadro32": {
        "titulo": "Cuadro 32: Paisaje Holandés",
        "descripcion": "Paisaje nórdico de atmósfera apacible.",
        "autor": "N/A",
        "tecnica": "Óleo sobre tabla",
        "medidas": "42 x 37 cm",
        "precio": 20,
        "reservado": True
    },
    "cuadro33": {
        "titulo": "Cuadro 33: Grabado aguafuerte",
        "descripcion": "Estampa en aguafuerte con numeración.",
        "autor": "E.Huck",
        "tecnica": "Grabado aguafuerte (Ejemplar 119/175)",
        "medidas": "51.5 x 42 cm",
        "precio": 15
    },
    "cuadro34": {
        "titulo": "Cuadro 34: Acuarela de coetero",
        "descripcion": "Figura popular con cohetes en acuarela.",
        "autor": "E.Zurra",
        "tecnica": "Acuarela",
        "medidas": "N/A",
        "precio": 50
    },
    "cuadro35": {
        "titulo": "Cuadro 35: Poema del Mar",
        "descripcion": "Lámina de Néstor, enmarcada entre cristales.",
        "autor": "Néstor",
        "tecnica": "Lámina enmarcada",
        "medidas": "46 x 47.5 cm",
        "precio": 15,
        "imagenes": ["imagenes_jpg/Cuadro35.jpg"]
    },
    "cuadro36": {
        "titulo": "Cuadro 36: Poema del Mar",
        "descripcion": "Lámina de Néstor, enmarcada entre cristales.",
        "autor": "Néstor",
        "tecnica": "Lámina enmarcada",
        "medidas": "46 x 47.5 cm",
        "precio": 15,
        "imagenes": ["imagenes_jpg/Cuadro36.jpg"]
    },
    "cuadro37": {
        "titulo": "Cuadro 37: Poema del Mar",
        "descripcion": "Lámina de Néstor, enmarcada entre cristales.",
        "autor": "Néstor",
        "tecnica": "Lámina enmarcada",
        "medidas": "46 x 47.5 cm",
        "precio": 15,
        "imagenes": ["imagenes_jpg/Cuadro37.jpg"]
    },
    "cuadro38": {
        "titulo": "Cuadro 38: Poema del Mar",
        "descripcion": "Lámina de Néstor, enmarcada entre cristales.",
        "autor": "Néstor",
        "tecnica": "Lámina enmarcada",
        "medidas": "46 x 47.5 cm",
        "precio": 15,
        "imagenes": ["imagenes_jpg/Cuadro38.jpg"]
    },
    "cuadro39": {
        "titulo": "Cuadro 39: Seda balinesa teñida",
        "descripcion": "Escena balinesa sobre seda, pieza firmada.",
        "autor": "Firmado",
        "tecnica": "Seda balinesa teñida",
        "medidas": "102 x 81 cm",
        "precio": 100,
        "imagenes": ["imagenes_jpg/Cuadro39.jpg"]
    },
    "cuadro40": {
        "titulo": "Cuadro 40: Seda balinesa teñida",
        "descripcion": "Seda balinesa teñida, obra firmada.",
        "autor": "Firmado",
        "tecnica": "Seda balinesa teñida",
        "medidas": "100 x 91 cm",
        "precio": 0,
        "precioDes": "Preguntar",
        "imagenes": ["imagenes_jpg/Cuadro40.jpg"]
    },
    "cuadro41": {
        "titulo": "Cuadro 41: Seda balinesa teñida",
        "descripcion": "Seda balinesa teñida en formato vertical (cristal roto), firmada.",
        "autor": "Firmado",
        "tecnica": "Seda balinesa teñida",
        "medidas": "157 x 54 cm",
        "precio": 50,
        "imagenes": ["imagenes_jpg/Cuadro41.jpg"]
    },
    "cuadro42": {
        "titulo": "Cuadro 42: Niño",
        "descripcion": "Figura infantil realizada con betún sobre lámina decapada.",
        "autor": "Carlos Tejedor Barrios",
        "tecnica": "Betún sobre lámina decapado",
        "medidas": "116 x 86 cm",
        "precio": 200,
        "imagenes": ["imagenes_jpg/Cuadro42.jpg"]
    }
}

# Actualización del marco
actualizacion_marco = {
    "titulo": "Marco: Dorado envejecido",
    "descripcion": "Marco decorativo dorado con pátina de envejecimiento, ideal para cuadros clásicos.",
    "medidas": "67 x 76 cm",
    "precio": 10,
    "reservado": True
}

updated_count = 0

# Añadir nuevos cuadros
for cuadro_id, cuadro_data in nuevos_cuadros.items():
    # Verificar si el cuadro ya existe
    exists = any(c['id'] == cuadro_id for c in data['cuadros'])
    if not exists:
        data['cuadros'].append(cuadro_data)
        print(f"✅ Añadido nuevo cuadro: {cuadro_id}")
        updated_count += 1
    else:
        print(f"ℹ️  {cuadro_id} ya existe")

# Actualizar cuadros existentes
for cuadro in data['cuadros']:
    cuadro_id = cuadro['id']
    if cuadro_id in actualizaciones:
        for key, value in actualizaciones[cuadro_id].items():
            if key not in cuadro or cuadro[key] != value:
                cuadro[key] = value
                print(f"✅ Actualizado {cuadro_id}: {key}")
                updated_count += 1

# Actualizar marco en artículos
for articulo in data['articulos']:
    if articulo['id'] == 'marco1':
        for key, value in actualizacion_marco.items():
            if key not in articulo or articulo[key] != value:
                articulo[key] = value
                print(f"✅ Actualizado marco: {key}")
                updated_count += 1

# Ordenar cuadros por ID numérico
def extract_number(cuadro_id):
    return int(cuadro_id.replace('cuadro', ''))

data['cuadros'].sort(key=lambda x: extract_number(x['id']))

# Guardar el archivo actualizado
with open('Articulos.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"\n✅ Se realizaron {updated_count} actualizaciones en total")
print(f"📊 Total de cuadros: {len(data['cuadros'])}")
print(f"📊 Total de artículos: {len(data['articulos'])}")
