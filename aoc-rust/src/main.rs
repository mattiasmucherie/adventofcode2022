use std::env;
use std::fs;

fn main() {
    let args: Vec<String> = env::args().collect();
    let file_path = &args[1];

    let contents = fs::read_to_string(file_path).expect("Should have been able to read the file");
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
    elfs.sort_by(|a, b| b.partial_cmp(a).unwrap());
    let top_three = elfs[0] + elfs[1] + elfs[2];
    println!("Elf Vector {}", top_three);
}
