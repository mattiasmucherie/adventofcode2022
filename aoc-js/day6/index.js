const CHARS = 14;
const data =
  "gzbzwzjwwrfftfrrbvvcbcvcffpssvhhzfzbfzzrbrtrcttnthnhsnhsnnclcpctpprwwgppppchhvvctvtsvswwcdcrrdzdhzdzvddvfvfjjlldvvfllfhlfhlhghnhghrgrsggvbbhdhffzggmttjqtjjgljjwtjwjggldlzzrfrpppjsjggqrrdbbgwgtwwwtqwtqqvccjnnhrhqqsnssjbssmjjbzjjqnqnlnjncjjzzqddfqqqnqvnqncqqmsshqqccssvpvllbbfvfmmmgzgdggtjgjtjbttngtnnhhfrfddmtmtftcftthvttwzwrzrbrgrbrqbqccmmtvtqvtqqzmzwmzzzsvzvhhhqlhqlqplpggvmvwmmshhnshsjszzljlnlrnllgddqllpmllsgswwqnqlnlqqlmqqvrqvrqrppvrrqwqhqllgjgcggsllqgllghlghhbvhhcvvbddvcvwwwzdzzfjjvcczbbwccjvccmvmfvfgfmfttwrttpmtmsszccjggcssmqsmsgszzfpphghvgvvcddtltwlwnnrbbfdbbtssrvvmwwjfflmlblwlrlmlwwhrhnhqnnvdvllzblzzndzdlzzhpprbrprnrzrjjlnlnrrjddgrrwrttcstsgshszzvgvfvpfpqfpfbpbfbwbmmzvvnnqvvqppzspzpzplldqlqsqlldmlmgmcmwmsmfsfzfdzzbpzzbbcwbbtppphlhshchjjszztctpprqppszzchcqczczddscsrstsntstjsjqjjfggvccgbggqhghrhppdldnlndnpddllgplgppnlpnnmwwglghhftfrtrqtqsszrssfjjzhzfhfssflfslsmmgrrcdrdnrdnnqznndrrbtrrmhrhbhsbsgsnslsqlqnncpccplpldpldppshsdssqdsqdsqdsdsdfsddchczhczcszcscffzhfzffpbbgttdhthnhnjnwnnwrrmwmlljzlzlzdzrrcvcbbsfstfsfnfqftqffgjfjzfjfsjswswccsvcvlccshhjpjcccnfnqqmsqmmrwmwjwswgsgjsjttmjmjttpqtqwttgmgfmmnbnrnpnwppgspggwnwqnqpqmmbmmnwnllbwwdqqzsqqtgttnrtrllcwcchpchcbhbpbnpbpsptpvtvzvrzzslljddjzjjmqmmdpmddcdzzrdrqddtctppwzzwrzrvzrvrzzjtztqqsmmcncllhmlmpmhgsrtrzjhjbtfvhmzpssfbjwcdshthnmmqmfhlhwcbbllwzbwfgfvzjcqblchzqqqgcgmpnbnnblhbcpgmvsbvtcmhsghldlhqlghgtpdvjflmjsmppdsvrjlwvhmwsmfvvdnzpmtfqjqpjdctnnrlfjfvdtmvdmhsczlfsqwfrqtlqwnzdzrcdzmhvrgwnjjtqjrqljhgcffglvhnsdssqdpfrfhtjwlqzvfjmpjnqhsjvndtstqjsqgcmgqdjvfqnlmtjlvcblndprmffrgqdnnncnlfflclgqbjbmsdqsjrmzpwtbqqqqsqmgthhjfqwzvcbqwlvdbffhcvncpldmchnptbnlbhmzrrjhzvzdrvtlhsnfnfdnvhlrlrmdcpnmvdwswctcqldszlvftqtwldrhmfjmfvcgjcdjsbjqjwdtslblwhqfvgrfcpnhszqqsfwbwcmvfvccvztdmcjqfjvdvmbdtcjvtwqpwsqjtdvpvvvsdrrvngmjztgjtnpdbmtlrbrjlwsdnthgzgpssgbzzrqvgblqhrtfbflnphvhpzmdfrwqvjjvcpsmdrqwdbzlpnqpmglgqzfhctrzdpzdthqgjtvpwcrlsmqnjwgzlnqbthvfswhjtrrsrswhbmnddgzmznvppbnmtjpzpdpmpzpmsgfstzldgmrtgplwwsbztphtcvdfgsqzqwrmlqpnhvpcqpfjpbrthrtwgqlfnrqcrpvhssjmhfgpnzzvlrlcbnpmddhtdvvfrrvprqrwbhfgvvltgrhrpwsdgvrlgthbztcgcfggtcfzqtlcdhpmcvpgcszslhpfrttnrdrqpqlgdfwtccmbhfrnlbhhmrtrjmzstbqhmtphzcpcllzsnghfvlwvzzvlqrjmfsvhrnjnvldgnbqvpjsmmphhrmhqrtcncmjwbdlqtrvmhgjrjsrddcpqnjhfmczfgwzspnrjfwvfdpdlcfpvctfrlspdwwlnpbvbglzsmgfsmrshsqgcvlfrvjssrglbwvvvgpvtqshbtqmzbnglflhhldtfzqssptrbnnzdqwqtstpftdqgmmhfjdlfwtmcmtmcgcvtfhzvsbllgbchvlhrgnvvbsnrwqrlvdqlcwwlgbjrvrzgcvljqzvdngtbhpnppjrzpmbwztzvnvrbfccfgvnqvrcmpdblngcvlwjwzpbbwmnslsdjmbrwbvnjsgcmsfvzvnwbzrrlzvgdnzcqqgggvmcwczjqnrddnzhlndgzjbvtbtjqdnlvlflqnfvjdmfstpdfqsgjdslgtpgdnvvpmfwvlqbmbgdrqjhdfhlmsdtfwpscsvdzmswszjfwqtsjqpfnjjlnsspvlgzwwtvwgdzfjjljfwbvfbvpglcqcdbdpshwcqzswbwhftbfqblzpqfmqpvzdjsrcqtvjntnhmlhmzllffcjsdnwpfzdglvlrhrljbrhjhgdnfcqcrccwrbbhrvqwrzlwjrrwzsfcwsvbqsjgtgpzqwlczljrtdhtzcgsfgqssdbjjmttdtzhrqtbqjtqfwmcpdftrfjmznpscsqmtfcdpcdjwcqjvmhngcqnmtmwfttcvpwgcnhhgnnbgjdvztzhczvqljjqwcmwcbvmqqjsfnmhtbtsvsnsfwfzgdvlctrgdvbjqpgfrrlsnppmvhfbbclprlvcssnvtsgftmlpqrpjzrrphrzltbtgfwjqqvbgqjdpdgqvzppfzcbhdbbjttcdzclsphtlzfvnfqgpmqvpzrqgpdnbmsrqgsnfdwpvndzmsllgmnrlhnnzldwshtrrsrsmdncwrcjnmcjlwbbfpzcwzvldtgvbcvhnbhgjgwjcvslrfcwbqlrqldvpcgnbwbzzncncftrgbrwchfrrtnpqsjbcpzvplnbqdgtvnnrcwwfvbdzdrsfspvtbhflhsbqmlsjvfmpvjbfvcrdmgrfqsmqgfrntfqnlqbvmsqtpncjrstspbqvfmddmhwsssdcddshmwdlscttmdzljtpwhzhzhwsdnmgjstfmlnqqvzzdqpqsjdsllswmqcjtnthwqnhbscrjdstljqgncjvjvlpfrtscrzrqghrdvdnbtnpshpldcchljzrzqjlwwscnphvrwlvzttcdjdrddgmvqpvdmttdqhwpfmslzvnrwlrrdttbhctgpgzjrmdwjbcmsprwggvmdmmltldgpbfnppnrpwcnpgtblccdvbsnfvgzmjppftvndmdslfshjvndfvvzjjlzhgfmhcggttrcrbrlwrqgjpchvhnjwqnbsnmftwszhzftglrfdvvnbcbzsslgmdchtrrrqqzhllrfhwfwbbdgfpdfwssmzcfcnzmrhfdddtdhfqmctsglqbwhwpnbdzbsfbbvvthrrgjvztjjwgjcgjntrddmmdldtmvjnwjbcqwfwvfhsrpchznhlqpcttqjffbrpbftftdjzlrqchmzrfgjrqlndfwfrghtsfsblcvtjmjrbfrwdgsgzmmjpdlbwzfscfsfcdqwdwnjwjbvvbptmfrqltmnlpbtrqspwdfmhnncqgtrtmbzhfmwrbcqhmmpmvprvwrjplspcmmspldmbgpbtmqjtrfcpfhcnpjbnlhjpzflstjqfqvzcnfgvrmtplndchffzrtfrqdpdnzrspddwmpzlfchrzzfcfvmbvfnlfwtfbvnffdqhljbvwwdtmszgrjtzwqdbgvvfphcnsdgvlmslqngfmsbrztrnpjprghmjffscbnfqwrvjjjtfzrmjtzbwdsmzgmbtjzvddhngmzvflwftblbzfd";

const fourCharSame = (arrayOfString) => {
  return new Set(arrayOfString).size !== arrayOfString.length;
};

const arrayData = data.split("");

for (let i = 0; i < arrayData.length - CHARS; i++) {
  const recentChar = arrayData.slice(i, i + CHARS);
  if (!fourCharSame(recentChar)) {
    console.warn(i + 14);
    break;
  }
}