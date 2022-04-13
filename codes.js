module.exports = {
    answer: [
      `/*
      * Topic : Algorithms
      * Subtopic : SimpleArraySum
      * Language : c++
      * Problem Statement : Print the sum of the array's elements as a single integer.
      * Url : https://www.hackerrank.com/challenges/simple-array-sum/problem
   */
   
   #include <bits/stdc++.h>
   #include <numeric>
   
   using namespace std;
   
   vector<string> split_string(string);
   
   /*
    * Complete the simpleArraySum function below.
    */
   int simpleArraySum(vector<int> ar) {
       /*
        * Write your code here.
        */
       return accumulate(ar.begin(), ar.end(), 0);
   
   }
   
   int main()
   {
       ofstream fout(getenv("OUTPUT_PATH"));
   
       int ar_count;
       cin >> ar_count;
       cin.ignore(numeric_limits<streamsize>::max(), '\n');
   
       string ar_temp_temp;
       getline(cin, ar_temp_temp);
   
       vector<string> ar_temp = split_string(ar_temp_temp);
   
       vector<int> ar(ar_count);
   
       for (int ar_itr = 0; ar_itr < ar_count; ar_itr++) {
           int ar_item = stoi(ar_temp[ar_itr]);
   
           ar[ar_itr] = ar_item;
       }
   
       int result = simpleArraySum(ar);
   
       fout << result << "\n";
   
       fout.close();
   
       return 0;
   }
   
   vector<string> split_string(string input_string) {
       string::iterator new_end = unique(input_string.begin(), input_string.end(), [] (const char &x, const char &y) {
           return x == y and x == ' ';
       });
   
       input_string.erase(new_end, input_string.end());
   
       while (input_string[input_string.length() - 1] == ' ') {
           input_string.pop_back();
       }
   
       vector<string> splits;
       char delimiter = ' ';
   
       size_t i = 0;
       size_t pos = input_string.find(delimiter);
   
       while (pos != string::npos) {
           splits.push_back(input_string.substr(i, pos - i));
   
           i = pos + 1;
           pos = input_string.find(delimiter, i);
       }
   
       splits.push_back(input_string.substr(i, min(pos, input_string.length()) - i + 1));
   
       return splits;
   }
  `,
  `/*
  * Topic : Algorithms
  * Subtopic : SolveMeFirst
  *  Language : c++
  *  Problem Statement : sum of the above two integers
  *  Url : https://www.hackerrank.com/challenges/solve-me-first/problem
*/

#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

int solveMeFirst(int a, int b) {
 // Hint: Type return a+b; below:
  return a + b;
}

int main() {
  int num1, num2;
  int sum;
  cin>>num1>>num2;
  sum = solveMeFirst(num1,num2);
  cout<<sum;
  return 0;
}
`,
      `/*
      Topic : Algorithms
      Subtopic : Compare The Triplet
      Language : c++
      Problem Statement :Complete the function compareTriplets in the editor below. It must return an array of two integers, the first being Alice's score and the second being Bob's.
          compareTriplets has the following parameter(s):
              a: an array of integers representing Alice's challenge rating
              b: an array of integers representing Bob's challenge rating
      Url : https://www.hackerrank.com/challenges/compare-the-triplets/problem
  */
  
  #include <bits/stdc++.h>
  
  using namespace std;
  
  string ltrim(const string &);
  string rtrim(const string &);
  vector<string> split(const string &);
  
  // Complete the compareTriplets function below.
  vector<int> compareTriplets(vector<int> a, vector<int> b) {
      
      vector<int> result;
      int aliceScore = 0;
      int bobScore = 0;
  
      for(int i=0;i<a.size();i++){
          if(a[i] > b[i]) 
              aliceScore ++;
          else if(b[i] > a[i])
              bobScore++;
          }         
          result.push_back(aliceScore);
          result.push_back(bobScore);
          return result;
  }
  
  int main()
  {
      ofstream fout(getenv("OUTPUT_PATH"));
  
      string a_temp_temp;
      getline(cin, a_temp_temp);
  
      vector<string> a_temp = split(rtrim(a_temp_temp));
  
      vector<int> a(3);
  
      for (int i = 0; i < 3; i++) {
          int a_item = stoi(a_temp[i]);
  
          a[i] = a_item;
      }
  
      string b_temp_temp;
      getline(cin, b_temp_temp);
  
      vector<string> b_temp = split(rtrim(b_temp_temp));
  
      vector<int> b(3);
  
      for (int i = 0; i < 3; i++) {
          int b_item = stoi(b_temp[i]);
  
          b[i] = b_item;
      }
  
      vector<int> result = compareTriplets(a, b);
  
      for (int i = 0; i < result.size(); i++) {
          fout << result[i];
  
          if (i != result.size() - 1) {
              fout << " ";
          }
      }
  
      fout << "\n";
  
      fout.close();
  
      return 0;
  }
  
  string ltrim(const string &str) {
      string s(str);
  
      s.erase(
          s.begin(),
          find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
      );
  
      return s;
  }
  
  string rtrim(const string &str) {
      string s(str);
  
      s.erase(
          find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
          s.end()
      );
  
      return s;
  }
  
  vector<string> split(const string &str) {
      vector<string> tokens;
  
      string::size_type start = 0;
      string::size_type end = 0;
  
      while ((end = str.find(" ", start)) != string::npos) {
          tokens.push_back(str.substr(start, end - start));
  
          start = end + 1;
      }
  
      tokens.push_back(str.substr(start));
  
      return tokens;
  }
  `,
      `/*
      Topic : Algorithms
      Subtopic : A Very Big Sum
      Language : c++
      Problem Statement : 
          Complete the aVeryBigSum function in the editor below. It must return the sum of all array elements.
          aVeryBigSum has the following parameter(s):
          ar: an array of integers .
          
      Url :https://www.hackerrank.com/challenges/a-very-big-sum/problem
  */
  #include <bits/stdc++.h>
  
  using namespace std;
  
  vector<string> split_string(string);
  
  // Complete the aVeryBigSum function below.
  long aVeryBigSum(vector<long> ar) {
      
      long long int total =  accumulate(ar.begin(), ar.end(), 0ll);
      return total;
  }
  
  int main()
  {
      ofstream fout(getenv("OUTPUT_PATH"));
  
      int ar_count;
      cin >> ar_count;
      cin.ignore(numeric_limits<streamsize>::max(), '\n');
  
      string ar_temp_temp;
      getline(cin, ar_temp_temp);
  
      vector<string> ar_temp = split_string(ar_temp_temp);
  
      vector<long> ar(ar_count);
  
      for (int i = 0; i < ar_count; i++) {
          long ar_item = stol(ar_temp[i]);
  
          ar[i] = ar_item;
      }
  
      long result = aVeryBigSum(ar);
  
      fout << result << "\n";
  
      fout.close();
  
      return 0;
  }
  
  vector<string> split_string(string input_string) {
      string::iterator new_end = unique(input_string.begin(), input_string.end(), [] (const char &x, const char &y) {
          return x == y and x == ' ';
      });
  
      input_string.erase(new_end, input_string.end());
  
      while (input_string[input_string.length() - 1] == ' ') {
          input_string.pop_back();
      }
  
      vector<string> splits;
      char delimiter = ' ';
  
      size_t i = 0;
      size_t pos = input_string.find(delimiter);
  
      while (pos != string::npos) {
          splits.push_back(input_string.substr(i, pos - i));
  
          i = pos + 1;
          pos = input_string.find(delimiter, i);
      }
  
      splits.push_back(input_string.substr(i, min(pos, input_string.length()) - i + 1));
  
      return splits;
  }
  `,
    ],
  };