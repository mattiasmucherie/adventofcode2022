use std::fs;

fn main() {
    let contents =
        fs::read_to_string("./input.txt").expect("Should have been able to read the file");
    let lines: Vec<String> = contents.split("\n").map(|s| s.to_string()).collect();
    let mut elfs: Vec<i32> = Vec::new();
    let mut current_elf = 0;
    for i in lines {
        let my_int_result = i.parse::<i32>();
        match my_int_result {
            Ok(int) => {
                current_elf += int;
            }
            Err(_error) => {
                elfs.push(current_elf);
                current_elf = 0;
            }
        };
    }
    elfs.sort();
    let top_elf: i32 = elfs.iter().rev().take(1).sum();
    let top_three: i32 = elfs.iter().rev().take(3).sum();
    println!("Top Elf: {}\nTop Three: {}", top_elf, top_three);
}
