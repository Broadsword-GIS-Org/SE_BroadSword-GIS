
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

public final class GIS implements GISInterface {

    Connection map = null;

    /**
     * @return the instance of the GIS object.
     */
    public GIS getInstance() {
        return this;
    }

    
     /**
     * Default Constructor for the class that will initialize the fields and establish
     * map to the database using the default database names username and password
     *
     * authenticate the map
     */
    public GIS() {
            String database="NavUP_GIS", username="gladios", password="ios123#";

        try {
            Class.forName("org.postgresql.Driver");
            String url = "jdbc:postgresql://localhost:5432/" + database;
            map = DriverManager.getConnection(url, username, password);

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(GIS.class.getName()).log(Level.SEVERE, null, ex);
        }
        createMap();
    }
    
    
    /**
     * Constructor for the class that will initialize the fields and establish
     * map to the database.
     *
     * @param username String value that holds the username of the database
     * @param database String value that holds the name of the database
     * @param password String value that holds the password which will
     * authenticate the map
     */
    public GIS(String username, String database, String password) {
        try {
            Class.forName("org.postgresql.Driver");
            String url = "jdbc:postgresql://localhost:5432/" + database;
            map = DriverManager.getConnection(url, username, password);
//            System.out.println("Opened database successfully");
        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(GIS.class.getName()).log(Level.SEVERE, null, ex);
        }
        createMap();
    }

    
     /**
        * createMap creates the  tables for buildings, campus buildings , entrances, level2 ,level3 ,walls and stairs
        * It also reads in the data from the given JSON objects in the data file to the database.
     */
    @Override
    public void createMap() {
        try {
            String sql = "CREATE TABLE IF NOT EXISTS buildings (Name varchar(50),Description varchar(100),Geometry varchar(10),Coordinates varchar(5000));";
            map.createStatement().execute(sql);

            sql = "CREATE TABLE IF NOT EXISTS campus_buildings (Name varchar(50),Description varchar(100),Geometry varchar(10),Coordinates varchar(5000));";
            map.createStatement().execute(sql);

            sql = "CREATE TABLE IF NOT EXISTS entrances (Name varchar(50),Description varchar(100),Geometry varchar(10),Coordinates varchar(5000));";
            map.createStatement().execute(sql);

            sql = "CREATE TABLE IF NOT EXISTS level2 (id varchar(50),Room varchar(100),Building varchar(100),Level varchar(100),Geometry varchar(10),Coordinates varchar(5000));";
            map.createStatement().execute(sql);

            sql = "CREATE TABLE IF NOT EXISTS level3 (id varchar(50),Room varchar(100),Building varchar(100),Level varchar(100),Geometry varchar(10),Coordinates varchar(5000));";
            map.createStatement().execute(sql);

            sql = "CREATE TABLE IF NOT EXISTS walls (id varchar(50),Room varchar(100),Building varchar(100),Level varchar(100),Geometry varchar(10),Coordinates varchar(5000));";
            map.createStatement().execute(sql);

            sql = "CREATE TABLE IF NOT EXISTS stairs (id varchar(50),Level varchar(100),Position varchar(100),Building varchar(100),Geometry varchar(10),Coordinates varchar(5000));";
            map.createStatement().execute(sql);
            map.createStatement().execute("DELETE FROM buildings");
            map.createStatement().execute("DELETE FROM campus_buildings");
            map.createStatement().execute("DELETE FROM entrances");
            map.createStatement().execute("DELETE FROM level2");
            map.createStatement().execute("DELETE FROM level3");
            map.createStatement().execute("DELETE FROM walls");
            map.createStatement().execute("DELETE FROM stairs");
            int countFiles = 0;

            String table = "";
            String dataFile = "first";
            while (countFiles++ < 4) {
                switch (dataFile) {
                    case "first":
                        dataFile = "buildings.geojson";
                        table = "buildings";
                        break;
                    case "buildings.geojson":
                        dataFile = "campus_buildings.geojson";
                        table = "campus_buildings";
                        break;
                    case "campus_buildings.geojson":
                        dataFile = "entrances.geojson";
                        table = "entrances";
                        break;
                }

                BufferedReader buildings = new BufferedReader(new FileReader("data/" + dataFile));
                String line;
                buildings.readLine();
                buildings.readLine();
                buildings.readLine();
                buildings.readLine();

                while ((line = buildings.readLine()) != null) {

                    if (line.length() > 1) {
                        String name = line.split(":")[3].trim().split(",")[0].replace("\\/", "-").replaceAll("^\"|\"$", "");

                        String description = line.split(":")[4].trim().split(",")[0].replaceAll("^\"|\"$", "").replace(" }", "");

                        String geometry = line.split(":")[6].trim().split(",")[0].replaceAll("^\"|\"$", "");

                        String coordinates = line.split(":")[7].trim().replace("[ ", "").replace(" ]", "").replace(" },", "").replace(", 0.0", "").replace(" ", "");
                        insertBuilding(name, description, geometry, coordinates, table);
                    }
                }
            }

            countFiles = 0;
            table = "";
            while (countFiles++ < 4) {

                switch (dataFile) {
                    case "entrances.geojson":
                        dataFile = "lecture_halls(level2).geojson";
                        table = "level2";
                        break;
                    case "lecture_halls(level2).geojson":
                        dataFile = "lecture_halls(level3).geojson";
                        table = "level3";
                        break;
                    case "lecture_halls(level3).geojson":
                        dataFile = "lecture_walls.geojson";
                        table = "walls";
                        break;
                }

                BufferedReader buildings = new BufferedReader(new FileReader("data/" + dataFile));
                String line;
                buildings.readLine();
                buildings.readLine();
                buildings.readLine();
                buildings.readLine();

                while ((line = buildings.readLine()) != null) {

                    if (line.length() > 1) {
                        String id = line.split(":")[3].trim().split(",")[0].replaceAll("^\"|\"$", "");

                        String room = line.split(":")[4].trim().split(",")[0].replaceAll("^\"|\"$", "").replace(" }", "");

                        String building = line.split(":")[5].trim().split(",")[0].replaceAll("^\"|\"$", "");

                        String level = line.split(":")[6].trim().split(",")[0].replaceAll("^\"|\"$", "").replace(" }", "");

                        String geometry = line.split(":")[8].trim().split(",")[0].replaceAll("^\"|\"$", "");

                        String coordinates = line.split(":")[9].trim().replace("[ ", "").replace(" ]", "").replace(" },", "").replace(", 0.0", "").replace(" ", "").replace("}", "");

                        insertLecture(id, room, building, level, geometry, coordinates, table);
                    }
                }
            }

            dataFile = "stairs.geojson";
            table = "stairs";
            BufferedReader buildings = new BufferedReader(new FileReader("data/" + dataFile));
            String line;
            buildings.readLine();
            buildings.readLine();
            buildings.readLine();
            buildings.readLine();

            while ((line = buildings.readLine()) != null) {

                if (line.length() > 1) {
                    String id = line.split(":")[3].trim().split(",")[0].replaceAll("^\"|\"$", "");

                    String level = line.split(":")[4].trim().split(",")[0].replaceAll("^\"|\"$", "").replace(" }", "");

                    String position = line.split(":")[5].trim().split(",")[0].replaceAll("^\"|\"$", "");

                    String building = line.split(":")[6].trim().split(",")[0].replace(" }", "").replaceAll("^\"|\"$", "");

                    String geometry = line.split(":")[8].trim().split(",")[0].replaceAll("^\"|\"$", "");

                    String coordinates = line.split(":")[9].trim().replace("[ ", "").replace(" ]", "").replace(" },", "").replace(", 0.0", "").replace(" ", "").replace("}", "");

                    insertLecture(id, level, position, building, geometry, coordinates, table);
                }
            }
        } catch (FileNotFoundException ex) {
            Logger.getLogger(GIS.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException | SQLException ex) {
            Logger.getLogger(GIS.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Inserts a new building into the database
     * @param name the name of the building
     * @param description the description of the building
     * @param geometry the geometry of the building . ie polygon 
     * @param coordinates the coordinates of the building
     * @param table the table we want to insert the data into.
     */
    @Override
    public void insertBuilding(String name, String description, String geometry, String coordinates, String table) { //need to fix here
//        System.out.println(name.length() + "," + description.length()  + "," + geometry.length()  + "," + coordinates.length() );
        try {
            String query = "INSERT INTO " + table + " (Name,Description,Geometry,Coordinates) VALUES('" + name + "','" + description + "','" + geometry + "','" + coordinates + "')";
            map.createStatement().executeUpdate(query);
        } catch (SQLException ex) {
            Logger.getLogger(GIS.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
 /**
  *  Inserts a new lecture hall into a building
  * @param id 
  * @param room the room number 
  * @param building the building in which it exists
  * @param level the floor level
  * @param geometry the geometry type for the building
  * @param coordinates the coordinates of the lecture hall
  * @param table the table in which it should be inserted into
  */
    public void insertLecture(String id, String room, String building, String level, String geometry, String coordinates, String table) { 

        try {
            String query = "INSERT INTO " + table + " (id,Room,Building,Level,Geometry,Coordinates) VALUES('" + id + "','" + room + "','" + building + "','" + level + "','" + geometry + "','" + coordinates + "')";
            if ("stairs".equals(table)) {
                query = "INSERT INTO stairs (id,Level,Position,Building,Geometry,Coordinates) VALUES('" + id + "','" + room + "','" + building + "','" + level + "','" + geometry + "','" + coordinates + "')";
            }
            map.createStatement().executeUpdate(query);
        } catch (SQLException ex) {
            Logger.getLogger(GIS.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns the name ,description and geometry of a building 
     * @param name the name of the building requested
     * @return a string containing the name description and geometry of the building
     */
    @Override
    public String getBuilding(String name) {
        String building = "";
        try {
            ResultSet rs = map.createStatement().executeQuery("SELECT * FROM buildings WHERE Name LIKE '" + name + "'");
            if (rs.next()) {
                building += rs.getString("Name") + "," + rs.getString("Description") + "," + rs.getString("Geometry") + "," + getBuildingCoordinates(name);
            }
        } catch (SQLException ex) {
            Logger.getLogger(GIS.class.getName()).log(Level.SEVERE, null, ex);
        }
        return building;
    }

    /**
     * Allows us to add more buildings to the buildings file
     * Note: this only works with files in the same format as the building file 
     * and wont work with stairs
     * @param dataFile the name of the file that is requested to update.
     */
    public void addMoreData(String dataFile) {
        BufferedReader buildings = null;
        try {
            buildings = new BufferedReader(new FileReader("data/" + dataFile));
            String line;
            buildings.readLine();
            buildings.readLine();
            buildings.readLine();
            buildings.readLine();
            while ((line = buildings.readLine()) != null) {

                if (line.length() > 1) {
                    String name = line.split(":")[3].trim().split(",")[0].replace("\\/", "-").replaceAll("^\"|\"$", "");

                    String description = line.split(":")[4].trim().split(",")[0].replaceAll("^\"|\"$", "").replace(" }", "");

                    String geometry = line.split(":")[6].trim().split(",")[0].replaceAll("^\"|\"$", "");

                    String coordinates = line.split(":")[7].trim().replace("[ ", "").replace(" ]", "").replace(" },", "").replace(", 0.0", "").replace(" ", "");
                    insertBuilding(name, description, geometry, coordinates, "buildings");
                }
            }
        } catch (FileNotFoundException ex) {
            Logger.getLogger(GIS.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(GIS.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * gets all the lecture hall names in a given building
     * @param building the name of a given building
     * @return an array of strings with lecture hall names
     */
    @Override
    public ArrayList<String> getLectureHall(String building) {

        ArrayList<String> rooms = new ArrayList<>();
        try {
            ResultSet rsLevel2 = map.createStatement().executeQuery("SELECT * FROM level2 WHERE Building LIKE '" + building + "'");
            while (rsLevel2.next()) {
                rooms.add(rsLevel2.getString("Room"));
            }
            ResultSet rsLevel3 = map.createStatement().executeQuery("SELECT * FROM level3 WHERE Building LIKE '" + building + "'");
            while (rsLevel3.next()) {
                rooms.add(rsLevel3.getString("Room"));
            }
            ResultSet rsWalls = map.createStatement().executeQuery("SELECT * FROM walls WHERE Building LIKE '" + building + "'");
            while (rsWalls.next()) {
                rooms.add(rsWalls.getString("Room"));
            }
        } catch (SQLException ex) {
            Logger.getLogger(GIS.class.getName()).log(Level.SEVERE, null, ex);
        }
        return rooms;
    }

    @Override
    public String getBuilding(Double lat, Double lon) {
        String coord = "";
        String building = "Building not found.";
        try {
            ResultSet rs = map.createStatement().executeQuery("SELECT * FROM buildings");
            if (rs.next()) {
                coord += rs.getString("Geometry");
                for (int x = 0; x < coord.split(",").length - 1; x++) {
                    if (coord.split(",")[x].equals(lat.toString())) {
                        if (coord.split(",")[x + 1].equals(lon.toString())) {
                            return rs.getString("Building");
                        }
                    }
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(GIS.class.getName()).log(Level.SEVERE, null, ex);
        }
        return building;
    }

    /**
     * gets the room name and returns the coordinates of the lecture venue
     * @param room the lecture hall that is being requested eg IT 4-2
     * @return returns the an arraylist of the coordinates
     */
    @Override
    public ArrayList<Double> getLectureCoordinates(String room) {

        ArrayList<Double> rooms = new ArrayList<>();
        try {
            ResultSet rsLevel2 = map.createStatement().executeQuery("SELECT * FROM level2 WHERE Room LIKE '" + room + "'");
            while (rsLevel2.next()) {
                rooms.add(Double.valueOf(rsLevel2.getString("Coordinates").split(",")[0]));
                rooms.add(Double.valueOf(rsLevel2.getString("Coordinates").split(",")[0]));
            }
            ResultSet rsLevel3 = map.createStatement().executeQuery("SELECT * FROM level3 WHERE Room LIKE '" + room + "'");
            while (rsLevel3.next()) {
                rooms.add(Double.valueOf(rsLevel3.getString("Coordinates").split(",")[0]));
                rooms.add(Double.valueOf(rsLevel3.getString("Coordinates").split(",")[0]));
            }
            ResultSet rsWalls = map.createStatement().executeQuery("SELECT * FROM walls WHERE Room LIKE '" + room + "'");
            while (rsWalls.next()) {
                rooms.add(Double.valueOf(rsWalls.getString("Coordinates").split(",")[0]));
                rooms.add(Double.valueOf(rsWalls.getString("Coordinates").split(",")[0]));
            }
        } catch (SQLException ex) {
            Logger.getLogger(GIS.class.getName()).log(Level.SEVERE, null, ex);
        }

        return rooms;
    }

    /**
     * Gives the coordinates of a building name that is passed through to it
     * @param name the name of the building that has been requested
     * @return the coordinates of the building if it exists in the database
     */
    @Override
    public ArrayList<Double> getBuildingCoordinates(String name) {
        ArrayList<Double> coord = new ArrayList<>();
        try {
            ResultSet rs = map.createStatement().executeQuery("SELECT * FROM buildings WHERE Name LIKE '" + name + "'");
            while (rs.next()) {
                coord.add(Double.valueOf(rs.getString("Coordinates").split(",")[0]));
                coord.add(Double.valueOf(rs.getString("Coordinates").split(",")[1]));
            }
        } catch (SQLException ex) {
            Logger.getLogger(GIS.class.getName()).log(Level.SEVERE, null, ex);
        }
        return coord;
    }

    /**
     * Gives the names of all the possible buildings.
     * @return An arraylist of all the possible buildings on the map
     */
    @Override
    public ArrayList<String> getAllBuildings() {
        ArrayList<String> all = new ArrayList<>();
        try {
            ResultSet rs = map.createStatement().executeQuery("SELECT * FROM buildings");
            while (rs.next()) {
                all.add(rs.getString("Name"));
            }
        } catch (SQLException ex) {
            Logger.getLogger(GIS.class.getName()).log(Level.SEVERE, null, ex);
        }
        return all;
    }

    /**
     * Gets the Distance between two points
     * @param lat1 latitude of object1
     * @param lng1 longitude of object1
     * @param lat2 latitude of object 2
     * @param lng2 longitude of object 2
     * @return  a double containing the distance between the points
     */
    public double getDistance(double lat1, double lng1,
            double lat2, double lng2) {
        double a = (lat1 - lat2) * distPerLat(lat1);
        double b = (lng1 - lng2) * distPerLng(lat1);
        return Math.sqrt(a * a + b * b);
    }

    /**
     * Calculates the distance between the longitude points
     * @param lat the latitude
     * @return a double containing the distance for each longitude point
     */
    private static double distPerLng(double lat) {
        return 0.0003121092 * Math.pow(lat, 4)
                + 0.0101182384 * Math.pow(lat, 3)
                - 17.2385140059 * lat * lat
                + 5.5485277537 * lat + 111301.967182595;
    }

    /**
     * Calculates the distance between the latitude points
     * @param lat the latitude
     * @return a double containing the distance for each latitude point
     */
    private static double distPerLat(double lat) {
        return -0.000000487305676 * Math.pow(lat, 4)
                - 0.0033668574 * Math.pow(lat, 3)
                + 0.4601181791 * lat * lat
                - 1.4558127346 * lat + 110579.25662316;
    }
    
    /**
     * Gets the buildings given in a given radius
     * @param mLat the persons current latitude
     * @param mLon persons current longitude
     * @param radius the radius in which to look for
     * @return an arraylist of all buildings in the given radius
     */
    @Override
    public ArrayList<String> getBuildingInRadius(double mLat, double mLon, double radius) {
        ArrayList<String> closeBy = new ArrayList<>();
        ArrayList<String> building = getAllBuildings();

        for (String name : building) {
            if (radius * 1.0 > getDistance(getBuildingCoordinates(name).get(0), getBuildingCoordinates(name).get(1), mLat, mLon)) {
                closeBy.add(getBuilding(name));
            }
        }
        return closeBy;
    }
}
