
public class main {

    public static void main(String[] args) {
        // TODO code application logic here
            System.out.println("Working Directory = " +
              System.getProperty("user.dir"));
        GIS map = new GIS("postgres", "postgres", "1234");
        System.out.println("_____getting all building _____");
        System.out.println(map.getAllBuildings());
         System.out.println("_____gettingzoology coordinates _____");
        System.out.println(map.getBuildingCoordinates("Zoology"));
          System.out.println("_____getting all leacture halls in zoology_____");
         System.out.println(map.getLectureHall("Zoology"));
        System.out.println("_____getting rrom 3-8  coordinates _____");
        System.out.println(map.getLectureCoordinates("Room 3-8"));
        System.out.println("_____getting all building in 155m radius of EMS building _____");
        System.out.println(map.getBuildingInRadius(map.getBuildingCoordinates("EMS Building").get(0), map.getBuildingCoordinates("EMS Building").get(1), 155));

    }
}
