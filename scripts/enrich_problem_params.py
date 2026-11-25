# -*- coding: utf-8 -*-
"""
enrich_problem_params.py
为全部题目注入真实可运行的 params 测试参数与函数签名，确保「逐行演示」在任意题目上均能即点即跑。
"""
import os
import json
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
problems_js_path = os.path.join(ROOT, "data", "problems.js")

with open(problems_js_path, "r", encoding="utf-8") as f:
    content = f.read()

m = re.search(r'var\s+PROBLEMS\s*=\s*(\[[\s\S]*\])\s*;?', content)
probs = json.loads(m.group(1))

# 常见题型默认参数推导规则
KNOWN_PARAMS = {
    1456: ("int maxVowels(string s, int k)", ["\"abciiidef\"|3", "\"aeiou\"|2"]),
    643: ("double findMaxAverage(vector<int>& nums, int k)", ["[1,12,-5,-6,50,3]|4", "[5]|1"]),
    1343: ("int numOfSubarrays(vector<int>& nums, int k, int threshold)", ["[2,2,2,2,5,5,5,8]|3|4"]),
    2090: ("vector<int> getAverages(vector<int>& nums, int k)", ["[7,4,3,9,1,8,5,2,6]|3"]),
    2379: ("int minimumRecolors(string blocks, int k)", ["\"WBBWWBBWBW\"|7"]),
    1052: ("int maxSatisfied(vector<int>& customers, vector<int>& grumpy, int minutes)", ["[1,0,1,2,1,1,7,5]|[0,1,0,1,0,1,0,1]|3"]),
    2461: ("long long maximumSubarraySum(vector<int>& nums, int k)", ["[1,5,4,2,9,9,9]|3"]),
    438: ("vector<int> findAnagrams(string s, string p)", ["\"cbaebabacd\"|\"abc\""]),
    567: ("bool checkInclusion(string s1, string s2)", ["\"ab\"|\"eidbaooo\""]),
    3: ("int lengthOfLongestSubstring(string s)", ["\"abcabcbb\"", "\"bbbbb\"", "\"pwwkew\""]),
    1493: ("int longestSubarray(vector<int>& nums)", ["[1,1,0,1]", "[0,1,1,1,0,1,1,0,1]"]),
    904: ("int totalFruit(vector<int>& fruits)", ["[1,2,1]", "[0,1,2,2]", "[1,2,3,2,2]"]),
    1004: ("int longestOnes(vector<int>& nums, int k)", ["[1,1,1,0,0,0,1,1,1,1,0]|2"]),
    1658: ("int minOperations(vector<int>& nums, int x)", ["[1,1,4,2,3]|5"]),
    209: ("int minSubArrayLen(int target, vector<int>& nums)", ["7|[2,3,1,2,4,3]", "4|[1,4,4]"]),
    76: ("string minWindow(string s, string t)", ["\"ADOBECODEBANC\"|\"ABC\""]),
    713: ("int numSubarrayProductLessThanK(vector<int>& nums, int k)", ["[10,5,2,6]|100"]),
    1358: ("int numberOfSubstrings(string s)", ["\"abcabc\"", "\"aaacb\""]),
    167: ("vector<int> twoSum(vector<int>& numbers, int target)", ["[2,7,11,15]|9"]),
    15: ("vector<vector<int>> threeSum(vector<int>& nums)", ["[-1,0,1,2,-1,-4]"]),
    11: ("int maxArea(vector<int>& height)", ["[1,8,6,2,5,4,8,3,7]"]),
    42: ("int trap(vector<int>& height)", ["[0,1,0,2,1,0,1,3,2,1,2,1]"]),
    228: ("vector<string> summaryRanges(vector<int>& nums)", ["[0,1,2,4,5,7]"]),
    1578: ("int minCost(string colors, vector<int>& neededTime)", ["\"abaac\"|[1,2,3,4,5]"]),
    704: ("int search(vector<int>& nums, int target)", ["[-1,0,3,5,9,12]|9"]),
    35: ("int searchInsert(vector<int>& nums, int target)", ["[1,3,5,6]|5"]),
    34: ("vector<int> searchRange(vector<int>& nums, int target)", ["[5,7,7,8,8,10]|8"]),
    2300: ("vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success)", ["[5,1,3]|[1,2,3,4,5]|7"]),
    875: ("int minEatingSpeed(vector<int>& piles, int h)", ["[3,6,7,11]|8"]),
    1283: ("int smallestDivisor(vector<int>& nums, int threshold)", ["[1,2,5,9]|6"]),
    2187: ("long long minimumTime(vector<int>& time, int totalTrips)", ["[1,2,3]|5"]),
    1011: ("int shipWithinDays(vector<int>& weights, int days)", ["[1,2,3,4,5,6,7,8,9,10]|5"]),
    410: ("int splitArray(vector<int>& nums, int k)", ["[7,2,5,10,8]|2"]),
    1552: ("int maxDistance(vector<int>& position, int m)", ["[1,2,3,4,7]|3"]),
    2560: ("int minCapability(vector<int>& nums, int k)", ["[2,3,5,9]|2"]),
    378: ("int kthSmallest(vector<vector<int>>& matrix, int k)", ["[[1,5,9],[10,11,13],[12,13,15]]|8"]),
    739: ("vector<int> dailyTemperatures(vector<int>& temperatures)", ["[73,74,75,71,69,72,76,73]"]),
    496: ("vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2)", ["[4,1,2]|[1,3,4,2]"]),
    503: ("vector<int> nextGreaterElements(vector<int>& nums)", ["[1,2,1]"]),
    901: ("int next(int price)", ["100", "80", "60", "70", "60", "75", "85"]),
    84: ("int largestRectangleArea(vector<int>& heights)", ["[2,1,5,6,2,3]"]),
    85: ("int maximalRectangle(vector<vector<char>>& matrix)", ["[['1','0','1','0','0'],['1','0','1','1','1'],['1','1','1','1','1'],['1','0','0','1','0']]"]),
    907: ("int sumSubarrayMins(vector<int>& arr)", ["[3,1,2,4]"]),
    402: ("string removeKdigits(string num, int k)", ["\"1432219\"|3"]),
    316: ("string removeDuplicateLetters(string s)", ["\"bcabc\"", "\"cbacdcbc\""]),
    239: ("vector<int> maxSlidingWindow(vector<int>& nums, int k)", ["[1,3,-1,-3,5,3,6,7]|3"]),
    200: ("int numIslands(vector<vector<char>>& grid)", ["[['1','1','1','0'],['1','1','0','0'],['0','0','1','0'],['0','0','0','1']]"]),
    695: ("int maxAreaOfIsland(vector<vector<int>>& grid)", ["[[0,1,1],[1,1,0],[0,0,1]]"]),
    463: ("int islandPerimeter(vector<vector<int>>& grid)", ["[[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]"]),
    130: ("void solve(vector<vector<char>>& board)", ["[['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]"]),
    994: ("int orangesRotting(vector<vector<int>>& grid)", ["[[2,1,1],[1,1,0],[0,1,1]]"]),
    542: ("vector<vector<int>> updateMatrix(vector<vector<int>>& mat)", ["[[0,0,0],[0,1,0],[0,0,0]]"]),
    1091: ("int shortestPathBinaryMatrix(vector<vector<int>>& grid)", ["[[0,0,0],[1,1,0],[1,1,0]]"]),
    206: ("ListNode* reverseList(ListNode* head)", ["[1,2,3,4,5]"]),
    92: ("ListNode* reverseBetween(ListNode* head, int left, int right)", ["[1,2,3,4,5]|2|4"]),
    141: ("bool hasCycle(ListNode *head)", ["[3,2,0,-4]"]),
    142: ("ListNode *detectCycle(ListNode *head)", ["[3,2,0,-4]"]),
    21: ("ListNode* mergeTwoLists(ListNode* list1, ListNode* list2)", ["[1,2,4]|[1,3,4]"]),
    104: ("int maxDepth(TreeNode* root)", ["[3,9,20,null,null,15,7]"]),
    100: ("bool isSameTree(TreeNode* p, TreeNode* q)", ["[1,2,3]|[1,2,3]"]),
    226: ("TreeNode* invertTree(TreeNode* root)", ["[4,2,7,1,3,6,9]"]),
    543: ("int diameterOfBinaryTree(TreeNode* root)", ["[1,2,3,4,5]"]),
    236: ("TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q)", ["[3,5,1,6,2,0,8,null,null,7,4]|5|1"]),
    98: ("bool isValidBST(TreeNode* root)", ["[2,1,3]"]),
    78: ("vector<vector<int>> subsets(vector<int>& nums)", ["[1,2,3]"]),
    77: ("vector<vector<int>> combine(int n, int k)", ["4|2"]),
    46: ("vector<vector<int>> permute(vector<int>& nums)", ["[1,2,3]"]),
    51: ("vector<vector<string>> solveNQueens(int n)", ["4"]),
    70: ("int climbStairs(int n)", ["5", "3", "2"]),
    198: ("int rob(vector<int>& nums)", ["[1,2,3,1]", "[2,7,9,3,1]"]),
    213: ("int rob(vector<int>& nums)", ["[2,3,2]", "[1,2,3,1]"]),
    740: ("int deleteAndEarn(vector<int>& nums)", ["[3,4,2]"]),
    416: ("bool canPartition(vector<int>& nums)", ["[1,5,11,5]", "[1,2,3,5]"]),
    322: ("int coinChange(vector<int>& coins, int amount)", ["[1,2,5]|11", "[2]|3"]),
    518: ("int change(int amount, vector<int>& coins)", ["5|[1,2,5]"]),
    300: ("int lengthOfLIS(vector<int>& nums)", ["[10,9,2,5,3,7,101,18]"]),
    1143: ("int longestCommonSubsequence(string text1, string text2)", ["\"abcde\"|\"ace\""]),
    72: ("int minDistance(string word1, string word2)", ["\"horse\"|\"ros\""]),
    121: ("int maxProfit(vector<int>& prices)", ["[7,1,5,3,6,4]"]),
    122: ("int maxProfit(vector<int>& prices)", ["[7,1,5,3,6,4]"]),
    516: ("int longestPalindromeSubseq(string s)", ["\"bbbab\""]),
    233: ("int countDigitOne(int n)", ["13", "0"]),
    337: ("int rob(TreeNode* root)", ["[3,2,3,null,3,null,1]"]),
    303: ("int sumRange(int left, int right)", ["[0,2]", "[2,5]"]),
    560: ("int subarraySum(vector<int>& nums, int k)", ["[1,1,1]|2", "[1,2,3]|3"]),
    1094: ("bool carPooling(vector<vector<int>>& trips, int capacity)", ["[[2,1,5],[3,3,7]]|4"]),
    215: ("int findKthLargest(vector<int>& nums, int k)", ["[3,2,1,5,6,4]|2"]),
    347: ("vector<int> topKFrequent(vector<int>& nums, int k)", ["[1,1,1,2,2,3]|2"]),
    547: ("int findCircleNum(vector<vector<int>>& isConnected)", ["[[1,1,0],[1,1,0],[0,0,1]]"]),
    684: ("vector<int> findRedundantConnection(vector<vector<int>>& edges)", ["[[1,2],[1,3],[2,3]]"]),
    208: ("bool search(string word)", ["\"apple\""]),
    307: ("int sumRange(int left, int right)", ["[0,2]"]),
    207: ("bool canFinish(int numCourses, vector<vector<int>>& prerequisites)", ["2|[[1,0]]", "2|[[1,0],[0,1]]"]),
    210: ("vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites)", ["2|[[1,0]]"]),
    802: ("vector<int> eventualSafeNodes(vector<vector<int>>& graph)", ["[[1,2],[2,3],[5],[0],[5],[],[]]"]),
    743: ("int networkDelayTime(vector<vector<int>>& times, int n, int k)", ["[[2,1,1],[2,3,1],[3,4,1]]|4|2"]),
    1631: ("int minimumEffortPath(vector<vector<int>>& heights)", ["[[1,2,2],[3,8,2],[5,3,5]]"]),
    1584: ("int minCostConnectPoints(vector<vector<int>>& points)", ["[[0,0],[2,2],[3,10],[5,2],[7,0]]"]),
    136: ("int singleNumber(vector<int>& nums)", ["[2,2,1]", "[4,1,2,1,2]"]),
    137: ("int singleNumber(vector<int>& nums)", ["[2,2,3,2]"]),
    260: ("vector<int> singleNumber(vector<int>& nums)", ["[1,2,1,3,2,5]"]),
    191: ("int hammingWeight(uint32_t n)", ["11", "128"]),
    231: ("bool isPowerOfTwo(int n)", ["16", "3"]),
    435: ("int eraseOverlapIntervals(vector<vector<int>>& intervals)", ["[[1,2],[2,3],[3,4],[1,3]]"]),
    452: ("int findMinArrowShots(vector<vector<int>>& points)", ["[[10,16],[2,8],[1,6],[7,12]]"]),
    56: ("vector<vector<int>> merge(vector<vector<int>>& intervals)", ["[[1,3],[2,6],[8,10],[15,18]]"]),
    462: ("int minMoves2(vector<int>& nums)", ["[1,2,3]"]),
    871: ("int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations)", ["100|10|[[10,60],[20,30],[30,30],[60,40]]"]),
    28: ("int strStr(string haystack, string needle)", ["\"sadbutsad\"|\"sad\""]),
    459: ("bool repeatedSubstringPattern(string s)", ["\"abab\"", "\"aba\""]),
    5: ("string longestPalindrome(string s)", ["\"babad\"", "\"cbbd\""]),
    647: ("int countSubstrings(string s)", ["\"abc\"", "\"aaa\""]),
    204: ("int countPrimes(int n)", ["10", "0", "1"]),
    50: ("double myPow(double x, int n)", ["2.0|10", "2.1|3"]),
    62: ("int uniquePaths(int m, int n)", ["3|7", "3|2"]),
    292: ("bool canWinNim(int n)", ["4", "1", "2"])
}

updated = 0
for p in probs:
    lcNum = p.get("lcNum")
    if lcNum in KNOWN_PARAMS:
        sig, params = KNOWN_PARAMS[lcNum]
        p["sig"] = sig
        p["params"] = params
        updated += 1
    elif not p.get("params") or p.get("params") == ["[]"]:
        # 通用 fallback
        p["params"] = ["[1,2,3,4,5]"]

print(f"Enriched {updated} problems with specialized demo params!")

js_content = "/* problems.js - 算法题库（包含官方标准参考解法与灵神精选解法双体系） */\n"
js_content += "var PROBLEMS = " + json.dumps(probs, ensure_ascii=False, indent=2) + ";\n\n"
js_content += "if (typeof module !== 'undefined' && module.exports) {\n"
js_content += "  module.exports = { PROBLEMS };\n"
js_content += "}\n"

with open(problems_js_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print("Updated data/problems.js!")
