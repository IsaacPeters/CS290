//----------------------------------------------------------
// CS260 Assignment Starter Code
// Copyright Andrew Scholer (ascholer@chemeketa.edu)
// Neither this code, nor any works derived from it
//    may not be republished without approval.
//----------------------------------------------------------

#include <functional>
#include <iostream>

#include "IndexMap.h"

using namespace std;

// Implementations

IndexMap::IndexMap(int startingBuckets) {
    numBuckets = startingBuckets;
    keyCount = 0;
    buckets = new IndexRecord[numBuckets];
    for (int i = 0; i < numBuckets; i++)
        buckets[i] = EMPTY_CELL;
}

IndexMap::~IndexMap()
{
    delete [] buckets;
}

void IndexMap::grow() {
    IndexRecord* tempBuckets = buckets;
    int tempSize = numBuckets;

    keyCount = 0; // 0 values in new storage, will rebuild below
    numBuckets = numBuckets*2 + 1;
    buckets = new IndexRecord[numBuckets];
    for (int i = 0; i < numBuckets; i++)
        buckets[i] = EMPTY_CELL;

    for (int i = 0; i < tempSize; i++) {
        if (tempBuckets[i].word != EMPTY_CELL.word && tempBuckets[i].word != PREVIOUSLY_USED_CELL.word) {
            this->add(tempBuckets[i]);
        }
    }
    delete [] tempBuckets;
}


int IndexMap::getBucket(const std::string& key) const {
    hash<string> theHashHashingHasher;
    unsigned int hashValue = theHashHashingHasher(key);

    return hashValue % numBuckets;
}

bool IndexMap::contains(const std::string& key) const {
    int bucketNumber = getBucket(key);

    while(buckets[bucketNumber].word != EMPTY_CELL.word) {
        if ( buckets[bucketNumber].word == key)
            return true;
        bucketNumber = (bucketNumber + 1) % numBuckets;
    }

    return false;
}

void IndexMap::add(const std::string& key, int pageNumber, int wordNumber) {
    if (key == "?" || key == "#")
        throw invalid_argument("Invalid key");

    // grow if needed
    if (numBuckets * MAX_LOAD < keyCount)
        grow();

    int bucketNumber = getBucket(key);
    while(buckets[bucketNumber].word != EMPTY_CELL.word && buckets[bucketNumber].word != PREVIOUSLY_USED_CELL.word) {
        if (buckets[bucketNumber].word == key) {
            buckets[bucketNumber].addLocation(IndexLocation(pageNumber, wordNumber));
            return;
        }

        bucketNumber = (bucketNumber + 1) % numBuckets;

    }
    buckets[bucketNumber] = IndexRecord(key);
    buckets[bucketNumber].addLocation(IndexLocation(pageNumber, wordNumber));
    keyCount++;
}

void IndexMap::add(IndexRecord& record) {
    int bucketNumber = getBucket(record.word);

    while(buckets[bucketNumber].word != EMPTY_CELL.word && buckets[bucketNumber].word != PREVIOUSLY_USED_CELL.word) {
        bucketNumber = (bucketNumber + 1) % numBuckets;
    }
    buckets[bucketNumber] = record;
    keyCount++;
}

void IndexMap::print() const {
    for (int i = 0; i < numBuckets; i++) {
        cout << "Bucket Number: " << i << endl;
        cout << "\tWord: " << buckets[i].word << endl;
        for (std::vector<IndexLocation>::iterator j = buckets[i].locations.begin(); j != buckets[i].locations.end(); ++j) {
            cout << "\t\tLocation: " << *j << endl;
        }
    }
}

IndexRecord IndexMap::get(const std::string& word) const {
    int bucketNumber = getBucket(word);
    while(buckets[bucketNumber].word != EMPTY_CELL.word && buckets[bucketNumber].word != PREVIOUSLY_USED_CELL.word) {
        if (buckets[bucketNumber].word == word) {
            return buckets[bucketNumber];
        }
        bucketNumber = (bucketNumber + 1) % numBuckets;
    }

    return EMPTY_CELL;
}

int IndexMap::numKeys() const {
    return keyCount;
}

void IndexMap::findWordPairs(const std::string& key1, const std::string& key2) const {
    int firstIndex = getBucket(key1);
    while(buckets[firstIndex].word != EMPTY_CELL.word) {
        if (buckets[firstIndex].word == key1) {
            break;
        }
        firstIndex = (firstIndex + 1) % numBuckets;
    }

    int secondIndex = getBucket(key2);
    while(buckets[secondIndex].word != EMPTY_CELL.word) {
        if (buckets[secondIndex].word == key2) {
            break;
        }
        secondIndex = (secondIndex + 1) % numBuckets;
    }

    IndexRecord first = buckets[firstIndex];
    IndexRecord second = buckets[secondIndex];

    for (std::vector<IndexLocation>::iterator i = first.locations.begin(); i != first.locations.end(); ++i) {
        for (std::vector<IndexLocation>::iterator j = second.locations.begin(); j != second.locations.end(); ++j) {
            if (i->pageNum == j->pageNum && i->wordNum == j->wordNum - 1) {
                cout << *i << endl;
            }
        }
    }
}

string IndexMap::firstWordOnPage(int pageNumber) const {
    // we need to search for IndexLocation(pageNumber, 0)
    for (int i = 0; i < numBuckets; i++) {
        if (buckets[i].word != EMPTY_CELL.word) {
            std::vector<IndexLocation>::iterator j = buckets[i].locations.begin();
            while(j->pageNum < pageNumber) {
                ++j;
            }
            if (j->pageNum == pageNumber && j->wordNum == 0)
                return buckets[i].word;
        }
    }

}
