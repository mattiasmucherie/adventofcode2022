use std::fs;

fn main() {
    let contents =
        fs::read_to_string("./input.txt").expect("Should have been able to read the file");
    let lines: Vec<String> = contents.split("\n").map(|s| s.to_string()).collect();
    let mut total_score = 0;
    for i in lines {
        let scores = i.split_once(' ').unwrap();
        // Part 1
        // match scores {
        //     (his_score, "X") => {
        //         total_score += 1;
        //         match his_score {
        //             "A" => total_score += 3,
        //             "B" => total_score += 0,
        //             "C" => total_score += 6,
        //             _ => println!("nahh"),
        //         }
        //     }
        //     (his_score, "Y") => {
        //         total_score += 2;
        //         match his_score {
        //             "A" => total_score += 6,
        //             "B" => total_score += 3,
        //             "C" => total_score += 0,
        //             _ => println!("nahh"),
        //         }
        //     }
        //     (his_score, "Z") => {
        //         total_score += 3;
        //         match his_score {
        //             "A" => total_score += 0,
        //             "B" => total_score += 6,
        //             "C" => total_score += 3,
        //             _ => println!("nahh"),
        //         }
        //     }
        //     (_, _) => println!("ok"),
        // }
        // Part 2
        match scores {
            (his_score, "X") => match his_score {
                "A" => total_score += 3,
                "B" => total_score += 1,
                "C" => total_score += 2,
                _ => println!("nahh"),
            },
            (his_score, "Y") => {
                total_score += 3;
                match his_score {
                    "A" => total_score += 1,
                    "B" => total_score += 2,
                    "C" => total_score += 3,
                    _ => println!("nahh"),
                }
            }
            (his_score, "Z") => {
                total_score += 6;
                match his_score {
                    "A" => total_score += 2,
                    "B" => total_score += 3,
                    "C" => total_score += 1,
                    _ => println!("nahh"),
                }
            }
            (_, _) => println!("ok"),
        }
    }
    println!("Total Score: {}", total_score)
}
