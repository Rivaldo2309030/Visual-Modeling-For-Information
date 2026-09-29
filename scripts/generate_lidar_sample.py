import numpy as np

def generate_sample_lidar_pointcloud():
    # Simulación de nube de puntos 3D (.ply y .xyz) del aula con la maqueta de intersección vial
    # Dimensiones representativas de un aula: 7m x 6m x 2.8m de alto
    # En el centro (mesa) hay una maqueta a escala 1:50 de una intersección con cruce peatonal y vehículos
    
    np.random.seed(42)
    points = []
    colors = []
    
    # 1. Suelo del salón (plano Z = 0)
    n_floor = 1500
    x_floor = np.random.uniform(0, 7, n_floor)
    y_floor = np.random.uniform(0, 6, n_floor)
    z_floor = np.random.normal(0.0, 0.005, n_floor)
    for x, y, z in zip(x_floor, y_floor, z_floor):
        points.append((x, y, z))
        colors.append((200, 200, 200)) # Gris claro
        
    # 2. Mesa donde está la maqueta (X: 2.5 a 4.5, Y: 2.0 a 4.0, Z: 0.75m de alto)
    n_table = 2000
    x_table = np.random.uniform(2.5, 4.5, n_table)
    y_table = np.random.uniform(2.0, 4.0, n_table)
    z_table = np.random.normal(0.75, 0.003, n_table)
    for x, y, z in zip(x_table, y_table, z_table):
        points.append((x, y, z))
        colors.append((139, 69, 19)) # Café madera
        
    # 3. Elementos de la maqueta sobre la mesa:
    # 3a. Calzada asfaltada de la maqueta (Z = 0.76)
    n_road = 1000
    x_road = np.random.uniform(2.6, 4.4, n_road)
    y_road = np.random.uniform(2.8, 3.2, n_road) # Vía transversal
    for x, y, z in zip(x_road, y_road, np.random.normal(0.76, 0.002, n_road)):
        points.append((x, y, z))
        colors.append((50, 50, 50)) # Asfalto oscuro
        
    # 3b. Paso peatonal de cebra sobre la maqueta
    n_cross = 300
    x_cross = np.random.uniform(3.4, 3.6, n_cross)
    y_cross = np.random.uniform(2.8, 3.2, n_cross)
    for x, y, z in zip(x_cross, y_cross, np.random.normal(0.765, 0.001, n_cross)):
        points.append((x, y, z))
        colors.append((255, 255, 255)) # Blanco franjas
        
    # 3c. Vehículo a escala (bloque 3D: X: 3.0-3.3, Y: 2.9-3.1, Z: 0.76-0.82)
    n_car = 400
    x_car = np.random.uniform(3.0, 3.3, n_car)
    y_car = np.random.uniform(2.9, 3.1, n_car)
    z_car = np.random.uniform(0.76, 0.82, n_car)
    for x, y, z in zip(x_car, y_car, z_car):
        points.append((x, y, z))
        colors.append((220, 20, 60)) # Rojo coche
        
    # 3d. Poste de semáforo a escala (cilindro delgado vertical: X=3.65, Y=2.75, Z=0.76 a 0.90)
    n_pole = 200
    z_pole = np.random.uniform(0.76, 0.90, n_pole)
    for z in z_pole:
        points.append((3.65 + np.random.normal(0, 0.005), 2.75 + np.random.normal(0, 0.005), z))
        colors.append((255, 215, 0)) # Amarillo semáforo
        
    # Guardar en formato estándar ASCII PLY (Stanford Triangle Format)
    ply_path = "data/lidar/maqueta_aula_cruce.ply"
    with open(ply_path, "w", encoding="utf-8") as f:
        f.write("ply\n")
        f.write("format ascii 1.0\n")
        f.write("comment Nube de puntos LiDAR: Maqueta de crucero vial escaneada en el aula\n")
        f.write(f"element vertex {len(points)}\n")
        f.write("property float x\n")
        f.write("property float y\n")
        f.write("property float z\n")
        f.write("property uchar red\n")
        f.write("property uchar green\n")
        f.write("property uchar blue\n")
        f.write("end_header\n")
        for (x, y, z), (r, g, b) in zip(points, colors):
            f.write(f"{x:.4f} {y:.4f} {z:.4f} {r} {g} {b}\n")
            
    # Guardar también en formato XYZ simple
    xyz_path = "data/lidar/maqueta_aula_cruce.xyz"
    with open(xyz_path, "w", encoding="utf-8") as f:
        for (x, y, z), (r, g, b) in zip(points, colors):
            f.write(f"{x:.4f} {y:.4f} {z:.4f} {r} {g} {b}\n")
            
    print(f"Archivos LiDAR 3D generados ({len(points)} puntos):\n- {ply_path}\n- {xyz_path}")

if __name__ == "__main__":
    generate_sample_lidar_pointcloud()
