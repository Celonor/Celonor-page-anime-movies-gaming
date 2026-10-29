import os
import re
from pathlib import Path
from PIL import Image

# Carpeta de trabajo (por defecto donde está el script)
BIO_DIR = Path(__file__).parent.resolve()

# Extensiones de imagen soportadas
SUPPORTED_EXT = {'.jpg', '.jpeg', '.png', '.webp', '.bmp', '.jfif', '.tiff'}

def slugify(text: str) -> str:
    """Convierte el input a formato limpio en minúsculas y guiones."""
    text = text.strip().lower()
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'[^a-z0-9\-]', '', text)
    return text.strip('-')

def procesar_imagenes():
    # Detecta solo las imágenes que están sueltas en la raíz de bio/
    archivos = [
        f for f in BIO_DIR.iterdir()
        if f.is_file() and f.suffix.lower() in SUPPORTED_EXT and f.name != Path(__file__).name
    ]

    if not archivos:
        print("No se encontraron imágenes sueltas en la carpeta bio.")
        return

    # Orden natural por nombre original (o podés ordenar por fecha con f.stat().st_mtime)
    archivos.sort(key=lambda x: x.name.lower())

    print(f"Se encontraron {len(archivos)} imágenes sueltas en {BIO_DIR.name}/:")
    for f in archivos:
        print(f"  - {f.name}")

    nombre_input = input("\nIngresá el nombre base (ej. 'pollo' o 'Cyberpunk Edgerunners'): ")
    slug = slugify(nombre_input)

    if not slug:
        print("Nombre inválido. Operación cancelada.")
        return

    destino_dir = BIO_DIR / slug
    destino_dir.mkdir(parents=True, exist_ok=True)

    print(f"\nProcesando y moviendo a: {destino_dir.name}/")

    for i, archivo in enumerate(archivos, start=1):
        nombre_salida = f"{slug}-{i:02d}.jpg"
        ruta_salida = destino_dir / nombre_salida

        try:
            with Image.open(archivo) as img:
                # Si viene con transparencia (PNG/RGBA), rellenar fondo blanco antes de JPG
                if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                    img = img.convert("RGBA")
                    fondo_blanco = Image.new("RGB", img.size, (255, 255, 255))
                    fondo_blanco.paste(img, mask=img.split()[3])
                    img_final = fondo_blanco
                else:
                    img_final = img.convert("RGB")

                # Guarda como JPG real optimizado
                img_final.save(ruta_salida, format="JPEG", quality=90, optimize=True)

            # Borra el archivo original suelto
            archivo.unlink()
            print(f"  ✓ {archivo.name} -> {ruta_salida.name}")

        except Exception as e:
            print(f"  ✗ Error con {archivo.name}: {e}")

    print(f"\n¡Listo! Todo quedó guardado en '{destino_dir.name}'.")

if __name__ == "__main__":
    procesar_imagenes()