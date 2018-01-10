//----------------------------------------------------------
// CS260 Assignment Starter Code
// Copyright Andrew Scholer (ascholer@chemeketa.edu)
// Neither this code, nor any works derived from it
//    may not be republished without approval.
//----------------------------------------------------------
#include <iostream>
#include <fstream>
#include <ctime>

#include "IndexRecord.h"
#include "IndexMap.h"

using namespace std;


int main()
{
    cout << "----------------Section 3----------------" << endl;
    ifstream inFile("GreatExpectations.txt");
    if( !inFile.is_open() ) {
        cout << "Error opening file" << endl;
        return 1;
    }

    clock_t startClock = clock();
    IndexMap words(10);

    int page = 0;
    int wordNum = 0;
    while (!inFile.eof()) {
        string temp;
        inFile >> temp;
        if (temp == "----------------------------------------") {
            page++;
            wordNum = 0;
        }
        else {
            temp[0] = static_cast<char>(tolower(temp[0]));
            words.add(temp, page, wordNum);
            wordNum++;
        }
    }

    clock_t clockDuration = clock() - startClock;
    double seconds = 1.0 * clockDuration / CLOCKS_PER_SEC;
    cout << "\nIn " << seconds << " seconds, we created the index!\n";

    IndexRecord father = words.get("fathers");
    cout << father << endl;
    cout << "Number of unique words: " << words.numKeys() << endl;

    cout << "----------------Section 4----------------" << endl;

    cout << "Occurrences of \"great expectations\":" << endl;
    words.findWordPairs("great", "expectations");

    cout << "----------------Section 5----------------" << endl;

    cout << "First word on the 100th page: " << words.firstWordOnPage(100) << endl;
}
