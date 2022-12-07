use std::cmp::min;
use std::collections::HashMap;
use std::fs::read_to_string;

fn day7() -> (i32, i32) {
    let input = read_to_string("input.txt").unwrap();
    let mut file_directory: HashMap<String, i32> = HashMap::new();
    let mut pwd = vec![];
    for line in input.lines() {
        if line.starts_with("$ cd") {
            let dir: Vec<&str> = line.split(" ").collect();
            if dir[2] == ".." {
                pwd.pop();
            } else {
                pwd.push(dir[2]);
            }
        } else if !line.starts_with("$") && !line.starts_with("dir") {
            let mut words = line.split(" ");
            let file_size = words.next().unwrap();
            let size = file_size.parse::<i32>().unwrap();
            let mut prev_path = String::new();
            for path in &pwd {
                prev_path += &*path.to_string();
                if let Some(count) = file_directory.get(&prev_path) {
                    file_directory.insert(prev_path.to_string(), count + size);
                } else {
                    file_directory.insert(prev_path.to_string(), size);
                };
                prev_path += "/";
            }
        }
    }
    let need_to_be_free = file_directory.get("/").unwrap() - (70000000 - 30000000);
    let mut best_to_delete = 5974599;
    let mut sum = 0;
    for (_, size) in file_directory {
        if size < 100000 {
            sum += size;
        }
        if size >= need_to_be_free {
            best_to_delete = min(size, best_to_delete);
        }
    }
    (sum, best_to_delete)
}

fn main() {
    println!("{:?}", day7())
}
