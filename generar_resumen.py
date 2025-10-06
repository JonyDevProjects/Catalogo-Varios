import json

# Cargar el JSON
with open('Articulos.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Extraer productos vendidos
cuadros_vendidos = []
articulos_vendidos = []

# Procesar cuadros
for cuadro in data.get('cuadros', []):
    if cuadro.get('vendido', False):
        cuadros_vendidos.append(cuadro)

# Procesar artículos
for articulo in data.get('articulos', []):
    if articulo.get('vendido', False):
        articulos_vendidos.append(articulo)

# Calcular totales
total_cuadros_vendidos = len(cuadros_vendidos)
total_articulos_vendidos = len(articulos_vendidos)
total_productos_vendidos = total_cuadros_vendidos + total_articulos_vendidos

# Calcular valor total vendido
valor_total_cuadros = sum(c.get('precio', 0) for c in cuadros_vendidos)
valor_total_articulos = sum(a.get('precio', 0) for a in articulos_vendidos)
valor_total_vendido = valor_total_cuadros + valor_total_articulos

# Calcular precio medio
precio_medio = valor_total_vendido / total_productos_vendidos if total_productos_vendidos > 0 else 0

# Generar HTML con diseño profesional
html = '''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informe de Ventas - Catálogo</title>
    <style>
        /* Estilos base - Paleta sobria y profesional */
        body {{ 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: #f8f9fa; 
            color: #212529;
            line-height: 1.6;
        }}
        
        .container {{ 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white; 
            padding: 40px; 
            border-radius: 6px; 
            box-shadow: 0 2px 15px rgba(0,0,0,0.08);
            border: 1px solid #e9ecef;
        }}
        
        h1 {{ 
            color: #2c3e50; 
            text-align: center; 
            margin-bottom: 40px; 
            font-size: 2.2em;
            font-weight: 300;
            letter-spacing: -0.5px;
            border-bottom: 3px solid #34495e;
            padding-bottom: 15px;
        }}
        
        h2 {{ 
            color: #34495e; 
            border-bottom: 2px solid #bdc3c7; 
            padding-bottom: 12px; 
            margin-top: 40px;
            margin-bottom: 25px;
            font-size: 1.4em;
            font-weight: 500;
        }}
        
        h3 {{
            color: #2c3e50;
            margin: 0 0 15px 0;
            font-size: 1.1em;
            font-weight: 600;
        }}
        
        .summary {{ 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 25px; 
            margin-bottom: 40px; 
        }}
        
        .summary-card {{ 
            background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%); 
            color: white; 
            padding: 30px 25px; 
            border-radius: 6px; 
            text-align: center;
            border: 1px solid #2c3e50;
            transition: transform 0.2s ease;
        }}
        
        .summary-card:hover {{
            transform: translateY(-2px);
        }}
        
        .summary-card .number {{ 
            font-size: 2.5em; 
            font-weight: 700; 
            margin: 15px 0; 
            color: #ecf0f1;
        }}
        
        .summary-card p {{
            margin: 0;
            font-size: 1.1em;
            color: #bdc3c7;
            font-weight: 500;
        }}
        
        table {{ 
            width: 100%; 
            border-collapse: collapse; 
            margin: 25px 0; 
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 6px;
            overflow: hidden;
        }}
        
        th, td {{ 
            padding: 15px 12px; 
            text-align: left; 
            border-bottom: 1px solid #dee2e6; 
        }}
        
        th {{ 
            background: #34495e; 
            color: white; 
            font-weight: 600;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }}
        
        tr:nth-child(even) {{ 
            background: #f8f9fa; 
        }}
        
        tr:hover {{ 
            background: #e9ecef; 
        }}
        
        .precio {{ 
            font-weight: 700; 
            color: #27ae60;
            font-size: 1.1em;
        }}
        
        .vendido-badge {{ 
            background: #e74c3c; 
            color: white; 
            padding: 6px 12px; 
            border-radius: 4px; 
            font-size: 0.8em; 
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }}
        
        .categoria {{ 
            padding: 5px 10px; 
            border-radius: 4px; 
            font-size: 0.85em; 
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }}
        
        .cuadro {{ 
            background: #ecf0f1; 
            color: #2c3e50; 
            border: 1px solid #bdc3c7;
        }}
        
        .articulo {{ 
            background: #fdf2e9; 
            color: #d68910; 
            border: 1px solid #f39c12;
        }}
        
        .resumen-final {{
            margin-top: 40px;
            padding: 25px;
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-left: 4px solid #34495e;
            border-radius: 6px;
        }}
        
        .resumen-final ul {{
            margin: 0;
            padding-left: 20px;
        }}
        
        .resumen-final li {{
            margin: 8px 0;
            color: #495057;
        }}
        
        .firma {{
            margin-top: 40px;
            text-align: right;
            color: #6c757d;
            font-size: 0.9em;
            border-top: 1px solid #dee2e6;
            padding-top: 20px;
        }}
        
        /* Estilos para impresión */
        @media print {{
            @page {{
                size: A4;
                margin: 15mm 10mm;
            }}
            
            body {{
                background: white !important;
                color: #000 !important;
                font-size: 11pt !important;
                line-height: 1.4 !important;
            }}
            
            .container {{
                background: white !important;
                box-shadow: none !important;
                border: none !important;
                padding: 0 !important;
                margin: 0 !important;
                max-width: none !important;
            }}
            
            h1 {{
                color: #000 !important;
                font-size: 18pt !important;
                border-bottom: 2px solid #000 !important;
                margin-bottom: 20pt !important;
            }}
            
            h2 {{
                color: #000 !important;
                font-size: 14pt !important;
                border-bottom: 1px solid #000 !important;
                margin-top: 20pt !important;
                margin-bottom: 12pt !important;
                page-break-after: avoid;
            }}
            
            .summary {{
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 15pt !important;
                margin-bottom: 25pt !important;
            }}
            
            .summary-card {{
                background: #f5f5f5 !important;
                color: #000 !important;
                border: 2px solid #000 !important;
                padding: 15pt !important;
                border-radius: 0 !important;
                page-break-inside: avoid;
            }}
            
            .summary-card .number {{
                color: #000 !important;
                font-size: 20pt !important;
                margin: 8pt 0 !important;
            }}
            
            table {{
                font-size: 9pt !important;
                border: 1px solid #000 !important;
                page-break-inside: avoid;
                margin: 15pt 0 !important;
            }}
            
            th {{
                background: #e5e5e5 !important;
                color: #000 !important;
                border-bottom: 2px solid #000 !important;
                font-size: 8pt !important;
                padding: 8pt 6pt !important;
            }}
            
            td {{
                border-bottom: 1px solid #ccc !important;
                padding: 6pt !important;
                color: #000 !important;
            }}
            
            tr:nth-child(even) {{
                background: #f9f9f9 !important;
            }}
            
            .precio {{
                color: #000 !important;
                font-weight: bold !important;
            }}
            
            .vendido-badge {{
                background: #000 !important;
                color: white !important;
                border: 1px solid #000 !important;
            }}
            
            .categoria {{
                background: #f0f0f0 !important;
                color: #000 !important;
                border: 1px solid #999 !important;
            }}
            
            .resumen-final {{
                background: #f8f8f8 !important;
                border: 1px solid #000 !important;
                border-left: 4px solid #000 !important;
                page-break-inside: avoid;
                margin-top: 20pt !important;
                padding: 15pt !important;
            }}
            
            .firma {{
                border-top: 1px solid #000 !important;
                color: #000 !important;
                margin-top: 20pt !important;
                padding-top: 10pt !important;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Informe de Ventas - Catálogo de Arte</h1>
        
        <div class="summary">
            <div class="summary-card">
                <h3>Cuadros Vendidos</h3>
                <div class="number">{total_cuadros}</div>
                <p>Valor Total: {valor_cuadros}€</p>
            </div>
            <div class="summary-card">
                <h3>Artículos Vendidos</h3>
                <div class="number">{total_articulos}</div>
                <p>Valor Total: {valor_articulos}€</p>
            </div>
            <div class="summary-card">
                <h3>Total General</h3>
                <div class="number">{total_productos}</div>
                <p>Valor Total: {valor_total}€</p>
            </div>
        </div>

        <h2>Detalle de Cuadros Vendidos ({total_cuadros} unidades)</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Técnica</th>
                    <th>Medidas</th>
                    <th>Precio</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>'''.format(
    total_cuadros=total_cuadros_vendidos,
    total_articulos=total_articulos_vendidos,
    total_productos=total_productos_vendidos,
    valor_cuadros=valor_total_cuadros,
    valor_articulos=valor_total_articulos,
    valor_total=valor_total_vendido
)

# Agregar filas de cuadros
for cuadro in cuadros_vendidos:
    precio_text = f"{cuadro.get('precio', 0)}€" if cuadro.get('precio', 0) > 0 else cuadro.get('precioDes', 'Consultar')
    html += f'''
                <tr>
                    <td>{cuadro.get('id', 'N/A')}</td>
                    <td>{cuadro.get('titulo', 'N/A')}</td>
                    <td>{cuadro.get('autor', 'N/A')}</td>
                    <td>{cuadro.get('tecnica', 'N/A')}</td>
                    <td>{cuadro.get('medidas', 'N/A')}</td>
                    <td class="precio">{precio_text}</td>
                    <td><span class="vendido-badge">VENDIDO</span></td>
                </tr>'''

html += '''
            </tbody>
        </table>

        <h2>Detalle de Artículos Varios Vendidos ({total_articulos} unidades)</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Categoría</th>
                    <th>Material</th>
                    <th>Medidas</th>
                    <th>Precio</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>'''.format(total_articulos=total_articulos_vendidos)

# Agregar filas de artículos
for articulo in articulos_vendidos:
    precio_text = f"{articulo.get('precio', 0)}€" if articulo.get('precio', 0) > 0 else articulo.get('precioDes', 'Consultar')
    html += f'''
                <tr>
                    <td>{articulo.get('id', 'N/A')}</td>
                    <td>{articulo.get('titulo', 'N/A')}</td>
                    <td><span class="categoria articulo">{articulo.get('categoria', 'N/A')}</span></td>
                    <td>{articulo.get('material', 'N/A')}</td>
                    <td>{articulo.get('medidas', 'N/A')}</td>
                    <td class="precio">{precio_text}</td>
                    <td><span class="vendido-badge">VENDIDO</span></td>
                </tr>'''

html += '''
            </tbody>
        </table>

        <div class="resumen-final">
            <h3>Resumen Ejecutivo</h3>
            <ul>
                <li><strong>Total de productos vendidos:</strong> {total_productos} unidades</li>
                <li><strong>Cuadros vendidos:</strong> {total_cuadros} unidades por valor de {valor_cuadros}€</li>
                <li><strong>Artículos varios vendidos:</strong> {total_articulos} unidades por valor de {valor_articulos}€</li>
                <li><strong>Facturación total:</strong> {valor_total}€</li>
                <li><strong>Precio medio por unidad:</strong> {precio_medio:.2f}€</li>
            </ul>
        </div>
        
        <div class="firma">
            <p><strong>Informe generado el:</strong> 3 de octubre de 2025</p>
            <p><strong>Sistema:</strong> Catálogo de Arte Digital</p>
            <br>
            <p>_________________________</p>
            <p>Firma del responsable</p>
        </div>
    </div>
</body>
</html>'''.format(
    total_productos=total_productos_vendidos,
    total_cuadros=total_cuadros_vendidos,
    total_articulos=total_articulos_vendidos,
    valor_cuadros=valor_total_cuadros,
    valor_articulos=valor_total_articulos,
    valor_total=valor_total_vendido,
    precio_medio=precio_medio
)

# Guardar el archivo HTML
with open('resumen_vendidos.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"📊 RESUMEN DE PRODUCTOS VENDIDOS")
print(f"=" * 50)
print(f"🖼️  Cuadros vendidos: {total_cuadros_vendidos} (Valor: {valor_total_cuadros}€)")
print(f"🎯 Artículos vendidos: {total_articulos_vendidos} (Valor: {valor_total_articulos}€)")
print(f"📈 Total productos vendidos: {total_productos_vendidos}")
print(f"💰 Valor total de ventas: {valor_total_vendido}€")
print(f"")
print(f"✅ Archivo HTML generado: resumen_vendidos.html")