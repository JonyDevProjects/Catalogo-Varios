#!/usr/bin/env python3
import json

# Mapeo de los enlaces de Wallapop
links = {
    '1': 'https://es.wallapop.com/item/cuadro-pintura-al-oleo-1162278763',
    '2': 'https://es.wallapop.com/item/acuarela-avenida-constitucion-1165947466',
    '3': 'https://es.wallapop.com/item/oleo-paisaje-montana-colomina-1165949442',
    '4': 'https://es.wallapop.com/item/cuadro-calle-padre-damian-1165950622',
    '5': 'https://es.wallapop.com/item/cuadro-virgen-fuensalila-oleo-s-xx-1165952653',
    '6': 'https://es.wallapop.com/item/cuadro-oleo-flores-lienzo-1166022294',
    '7': 'https://es.wallapop.com/item/cuadro-oleo-flores-lienzo-1166022294',
    '8': 'https://es.wallapop.com/item/cuadro-oleo-lienzo-muelle-1166023641',
    '9': 'https://es.wallapop.com/item/oleo-sobre-tabla-paisaje-1166025125',
    'marco': 'https://es.wallapop.com/item/marco-dorado-antiguo-1166026612',
    '10': 'https://es.wallapop.com/item/cuadro-al-oleo-sobre-tabla-1166027599',
    '11': 'https://es.wallapop.com/item/cuadro-al-oleo-paisaje-campestre-1166029879',
    '12': 'https://es.wallapop.com/item/oleo-s-lienzo-muelle-chipiona-1166031850',
    '13': 'https://es.wallapop.com/item/papiro-egipcio-enmarcado-1166033689',
    '14': 'https://es.wallapop.com/item/cuadro-oleo-sobre-lienzo-vista-de-puerto-1166131679',
    '15': 'https://es.wallapop.com/item/oleo-sobre-tabla-paisaje-campestre-1166131861',
    '16': 'https://es.wallapop.com/item/oleo-sobre-lienzo-patio-tradicional-canario-1166132471',
    '17': 'https://es.wallapop.com/item/cuadro-mosaico-enmarcado-artesanal-1166132627',
    '18': 'https://es.wallapop.com/item/cuadro-punto-de-cruz-alfabeto-1166132703',
    '19': 'https://es.wallapop.com/item/cuadro-puerto-sevilla-1166132867',
    '20': 'https://es.wallapop.com/item/oleo-anciano-balines-sobre-hojas-1166133033',
    '21': 'https://es.wallapop.com/item/grabado-torre-del-oro-cuadro-1166133148',
    '22': 'https://es.wallapop.com/item/grabado-puente-triana-1166133397',
    '23': 'https://es.wallapop.com/item/acuarela-patio-sevillano-1166133486',
    '24': 'https://es.wallapop.com/item/acuarela-urbana-enmarcada-1166133591',
    '25': 'https://es.wallapop.com/item/oleo-sobre-lienzo-con-espatula-paisaje-campestre-1166134636',
    '26': 'https://es.wallapop.com/item/cuadro-seda-bali-arte-tradicional-1166134800',
    '27': 'https://es.wallapop.com/item/grabado-lance-taurino-1166134903',
    '28': 'https://es.wallapop.com/item/cuadro-seda-balinesa-arte-asiatico-1166134945',
    '29': 'https://es.wallapop.com/item/oleo-s-xx-escena-costera-1166135031',
    '30': 'https://es.wallapop.com/item/oleo-anciana-balinesa-1166135255',
    '31': 'https://es.wallapop.com/item/cuadro-flores-oleo-sobre-cobre-1166654098',
    '32': 'https://es.wallapop.com/item/cuadro-oleo-paisaje-holandes-1166655273',
    '33': 'https://es.wallapop.com/item/aguafuerte-enmarcado-e-huck-1166656516',
    '34': 'https://es.wallapop.com/item/acuarela-cohetero-en-pueblo-blanco-1166785553',
    '35': 'https://es.wallapop.com/item/laminas-bajamar-enmarcadas-1166792012',
    '36': 'https://es.wallapop.com/item/laminas-bajamar-enmarcadas-1166792012',
    '37': 'https://es.wallapop.com/item/laminas-bajamar-enmarcadas-1166792012',
    '38': 'https://es.wallapop.com/item/laminas-bajamar-enmarcadas-1166792012',
    '39': 'https://es.wallapop.com/item/pintura-seda-bali-arte-unico-1166795063',
    '40': 'https://es.wallapop.com/item/pintura-seda-balinesa-aves-exoticas-una-llena-1166796916',
    '41': 'https://es.wallapop.com/item/pintura-seda-bali-naturaleza-vibrante-1166797705',
    '42': 'https://es.wallapop.com/item/dibujo-nino-betun-sobre-lamina-1166798382'
}

# Leer el archivo JSON
with open('Articulos.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

updated_count = 0

# Actualizar enlaces de cuadros
for cuadro in data['cuadros']:
    cuadro_num = cuadro['id'].replace('cuadro', '')
    if not cuadro.get('adUrl') or cuadro['adUrl'] == '':
        if cuadro_num in links:
            cuadro['adUrl'] = links[cuadro_num]
            print(f"✅ Actualizado {cuadro['id']}: {cuadro['titulo']}")
            updated_count += 1
        else:
            print(f"⚠️  Sin enlace disponible para {cuadro['id']}: {cuadro['titulo']}")
    else:
        print(f"ℹ️  {cuadro['id']} ya tiene enlace")

# Actualizar enlace del marco en artículos
for articulo in data['articulos']:
    if articulo['id'] == 'marco1' and (not articulo.get('adUrl') or articulo['adUrl'] == ''):
        articulo['adUrl'] = links['marco']
        print(f"Actualizado {articulo['id']}: {articulo['titulo']}")
        updated_count += 1

# Guardar el archivo actualizado
with open('Articulos.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"\n✅ Se actualizaron {updated_count} elementos con sus enlaces de Wallapop")
