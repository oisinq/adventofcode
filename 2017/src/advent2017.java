import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class advent2017 {

    public static void main (String[] args) {
//        System.out.println(day1q1());
//        System.out.println(day1q2());
        try {
//            System.out.println(day2q1());
//            System.out.println(day4q1());
//            System.out.println(day5q1());
            System.out.println(day7q1());

        } catch (FileNotFoundException e) {
            System.out.println("File not found");
        }
//        System.out.println(day3q1());
//        System.out.println(day6q1());
//        System.out.println(day6q2());

    }

    public static int day1q1() {
        String input = "9384274494683632359351641411374573466273164687337536769779487433749179185568461296233353611992672753778126935276769885424719553291616136172298883156626254151278852582397949697874462178536295341822137377563322815527592267791213115418635363174876132196234374887626324931371241841242873783493835919238421879116421481543826222278152238576762132577763214642569545298668935216911493462229629786978273548147171384321525952959196377728493632872618291183256888417779495124837828187298244786175872713299271766246696631257484453347125176233373232245382158656142179687576388951175953419286858673221138553912229576523123114871637487978775855777483921896568333282333137175739746234262744256254149233843517254613981476355147487975859685936527161737644929119345127273149762325158784595946931447738173246311763677997888425452294562823751136515271874725143582623717324394587398371298523368386595426714148717735345237657249712685895921433468949182235146698174393928288313985355769799485511749423552935992391624424575278333625476148888355716967628454862834463357834291788479677576561681171516128495737923155533438413156639155128831349894646317546536886319328573512622325789672115171618195548534941184939233914166432349321992879287349932819135919518955561456615989137221875483561599493342981595678961836562435436285673764213941758954489582656271121429555455368545289416981624961261963953364918377483776322142975937971552271642224933926326665557787586927667898255947116988278131974381388514274833852552695679713424836536348449273149415872522111522749448188993159814183411853994579147867385867619467777654943169814287928966652552129439822741856512265955664872454951159255617513136142717471774698224566543617595742753244142364438589729356939483387466363477224283477843889679221229344974441624448489853764111425798141258155246636844914711222931548722647298953744242682551562166463942694715631497895981643174194294826868561578586851326262619731272665397711381459745281218196515155917877694663186732599688912878149242688741584822831861748845817871681621697944472377688658368145698614861456518138376989688166921187224726942589996534179549171859786241718727295379";
        int[] newGuess = new int[input.length()];
        for (int i = 0; i < input.length(); i++)
        {
            newGuess[i] = input.charAt(i) - '0';
        }
        int sum = 0;
        for(int i = 0; i < newGuess.length; i++) {
            if(newGuess[i] == newGuess[(i+1)%newGuess.length]) {
                sum += newGuess[i];
            }
        }
        return sum;
    }

    public static int day1q2() {
        String input = "9384274494683632359351641411374573466273164687337536769779487433749179185568461296233353611992672753778126935276769885424719553291616136172298883156626254151278852582397949697874462178536295341822137377563322815527592267791213115418635363174876132196234374887626324931371241841242873783493835919238421879116421481543826222278152238576762132577763214642569545298668935216911493462229629786978273548147171384321525952959196377728493632872618291183256888417779495124837828187298244786175872713299271766246696631257484453347125176233373232245382158656142179687576388951175953419286858673221138553912229576523123114871637487978775855777483921896568333282333137175739746234262744256254149233843517254613981476355147487975859685936527161737644929119345127273149762325158784595946931447738173246311763677997888425452294562823751136515271874725143582623717324394587398371298523368386595426714148717735345237657249712685895921433468949182235146698174393928288313985355769799485511749423552935992391624424575278333625476148888355716967628454862834463357834291788479677576561681171516128495737923155533438413156639155128831349894646317546536886319328573512622325789672115171618195548534941184939233914166432349321992879287349932819135919518955561456615989137221875483561599493342981595678961836562435436285673764213941758954489582656271121429555455368545289416981624961261963953364918377483776322142975937971552271642224933926326665557787586927667898255947116988278131974381388514274833852552695679713424836536348449273149415872522111522749448188993159814183411853994579147867385867619467777654943169814287928966652552129439822741856512265955664872454951159255617513136142717471774698224566543617595742753244142364438589729356939483387466363477224283477843889679221229344974441624448489853764111425798141258155246636844914711222931548722647298953744242682551562166463942694715631497895981643174194294826868561578586851326262619731272665397711381459745281218196515155917877694663186732599688912878149242688741584822831861748845817871681621697944472377688658368145698614861456518138376989688166921187224726942589996534179549171859786241718727295379";
        int[] newGuess = new int[input.length()];
        for (int i = 0; i < input.length(); i++)
        {
            newGuess[i] = input.charAt(i) - '0';
        }
        int sum = 0;
        for(int i = 0; i < newGuess.length; i++) {
            if(newGuess[i] == newGuess[(i+(newGuess.length/2))%newGuess.length]) {
                sum += newGuess[i];
            }
        }
        return sum;
    }

    public static int day2q1() throws FileNotFoundException {
        File f = new File("src/q2.txt");
        Scanner fileScanner = new Scanner(f);
        int sum = 0;

        while (fileScanner.hasNextLine()) {
            String line = fileScanner.nextLine();
            Scanner lineScanner = new Scanner(line);
            ArrayList<Integer> allValues = new ArrayList();
            while (lineScanner.hasNext()) {
                int value = lineScanner.nextInt();
                allValues.add(value);
            }

            int max = allValues.get(0), min = allValues.get(0);
            for (int value : allValues) {
               if (value > max) {
                   max = value;
               }
                if (value < min) {
                    min = value;
                }
            }
        }
        return sum/2;
    }

    public static int day2q2() throws FileNotFoundException {
       File f = new File("src/q2.txt");
       Scanner fileScanner = new Scanner(f);
       int sum = 0;

       while (fileScanner.hasNextLine()) {
           String line = fileScanner.nextLine();
           Scanner lineScanner = new Scanner(line);
           ArrayList<Integer> allValues = new ArrayList();
           while (lineScanner.hasNext()) {
               int value = lineScanner.nextInt();
               allValues.add(value);
           }

           int max = allValues.get(0), min = allValues.get(0);
           for (int first : allValues) {
               for (int second : allValues) {
                    if (first % second == 0 && first != second) {
                        sum += first/second;
                    } else if (second % first == 0 && first != second) {
                       sum += second/first;
                   }
               }
           }
       }
       return sum/2;
   }

    // This one's broken
    public static int day3q1() {
        int value = 361527, i = 0, limit = 0;
        boolean dontBreak = true;

        while(value > limit && i < 300) {
            limit += 8 * (i+1);
            i++;
        }

        int squareWidth = i;

        return i;
    }

    public static int day4q1() throws FileNotFoundException {
        File f = new File("src/q4.txt");
        Scanner fileScanner = new Scanner(f);
        int sum = 0;
        int count = 0;

        while (fileScanner.hasNextLine()) {
            String line = fileScanner.nextLine();
            Scanner lineScanner = new Scanner(line);
            ArrayList<String> allValues = new ArrayList();
            while (lineScanner.hasNext()) {
                String value = lineScanner.next();
                char[] valueArray = value.toCharArray();
                Arrays.sort(valueArray);
                value = new String(valueArray);
                allValues.add(value);
            }
            boolean match = false;
            for (String first : allValues) {
                for (String second : allValues) {
                    if (first.equals(second) && first != second) {
                        match = true;
                    }
                }
            }
            if (!match) {
                count++;
            }
        }
        return count;
    }

    public static int day5q1() throws FileNotFoundException {
        File f = new File("src/q5.txt");
        Scanner sc = new Scanner(f);
        ArrayList<Integer> allValues = new ArrayList();
        int index = 0;
        int currentStep;
        int count = 0;

        while (sc.hasNext()) {
            allValues.add(sc.nextInt());
        }

        while(index >= 0 && index < allValues.size()) {
            currentStep = allValues.get(index);
            if (allValues.get(index) >= 3) {
                allValues.set(index, allValues.get(index) - 1);
            } else {
                allValues.set(index, allValues.get(index) + 1);
            }
            index += currentStep;
            count++;
        }

        return count;
    }

    public static int day6q1() {
        int [] valueArray =  {5, 1, 10, 0, 1, 7, 13, 14, 3, 12, 8, 10, 7, 12, 0, 6};
    //    int [] valueArray =  {0, 2, 7, 0};
        boolean dupe = false;
        int numTurns = 0;
        ArrayList<int []> states = new ArrayList();

        while(!dupe) {
            int max = -1;
            int maxIndex = 0;
            numTurns++;

            for(int i = 0; i < valueArray.length; i++)
            {
                if(valueArray[i] > max) {
                    maxIndex = i;
                    max = valueArray[i];
                }
            }
            int fillIndex = (maxIndex + 1) % valueArray.length;
            int distributeCount = max;

            while(distributeCount > 0) {
                valueArray[fillIndex]++;
                valueArray[maxIndex]--;
                fillIndex = (fillIndex + 1) % valueArray.length;
                distributeCount--;
            }
            for(int[] instances : states) {
                if(Arrays.equals(instances, valueArray)) {
                    dupe = true;
                }
            }
            int[] valueArray2 = new int[valueArray.length];
            for (int i = 0; i < valueArray.length; i++)
            {
                valueArray2[i] = valueArray[i];
            }
            states.add(valueArray2);
        }

        return numTurns;
    }

    public static int day6q2() {
        int [] valueArray =  {5, 1, 10, 0, 1, 7, 13, 14, 3, 12, 8, 10, 7, 12, 0, 6};
      //      int [] valueArray =  {0, 2, 7, 0};
        boolean dupe = false;
        int numTurns = 0;
        ArrayList<int []> states = new ArrayList();

        while(!dupe) {
            int max = -1;
            int maxIndex = 0;
            numTurns++;

            for(int i = 0; i < valueArray.length; i++)
            {
                if(valueArray[i] > max) {
                    maxIndex = i;
                    max = valueArray[i];
                }
            }
            int fillIndex = (maxIndex + 1) % valueArray.length;
            int distributeCount = max;

            while(distributeCount > 0) {
                valueArray[fillIndex]++;
                valueArray[maxIndex]--;
                fillIndex = (fillIndex + 1) % valueArray.length;
                distributeCount--;
            }
            for(int[] instances : states) {
                if(Arrays.equals(instances, valueArray)) {
                    dupe = true;
                }
            }
            int[] valueArray2 = new int[valueArray.length];
            for (int i = 0; i < valueArray.length; i++)
            {
                valueArray2[i] = valueArray[i];
            }
            states.add(valueArray2);
        }

        numTurns = 0;
        int last = states.size()-1;

        boolean found = false;
        for(int i = states.size() - 2; !found; i--) {
            if (Arrays.equals(states.get(i), states.get(last))) {
                found = true;
            }
            numTurns++;
        }

        return numTurns;
    }

    public static String day7q1() throws FileNotFoundException {
        File f = new File("src/q7.txt");
        Scanner fileScanner = new Scanner(f);
        ArrayList<String> Nodes = new ArrayList<>();
        ArrayList<String> Names = new ArrayList<>();

        while (fileScanner.hasNextLine()) {
            String line = fileScanner.nextLine().replace(",", "").replace("(", "").replace(")", "");
            Scanner lineScanner = new Scanner(line);
            Names.add(lineScanner.next());
            lineScanner.next();
            if (lineScanner.hasNext()) {
                lineScanner.next();
                while (lineScanner.hasNext()) {
                    Nodes.add(lineScanner.next());
                }
            }
        }

        for(String name : Names) {
            boolean found = false;
            for(String node : Nodes) {
                if (name.equals(node)) {
                    found = true;
                }
            }
            if (!found) {
                return name;
            }
        }

        return "";
    }
}