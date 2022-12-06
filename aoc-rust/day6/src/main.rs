fn detect_start_of_packet(datastream: &str) -> Option<usize> {
    let mut last_four_chars = Vec::new();

    for (i, c) in datastream.char_indices() {
        last_four_chars.push(c);
        last_four_chars.truncate(4);

        if last_four_chars.len() == 4
            && last_four_chars
                .iter()
                .all(|&c| last_four_chars.iter().filter(|&&d| d == c).count() == 1)
        {
            return Some(i + 1);
        }
    }

    None
}

fn main() {
    let datastream = "bvwbjplbgvbhsrlpgdmjqwftvncz";
    let result = detect_start_of_packet(datastream);
    println!("{:?}", result); // Should print Some(7)
}
