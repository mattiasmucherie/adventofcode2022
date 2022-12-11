use criterion::{criterion_group, criterion_main, Criterion};
use std::fs::read_to_string;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Operation {
    Multiply,
    Add,
    Squared,
}

#[derive(Debug, Clone, PartialEq, Eq)]
struct Monkey {
    items: Vec<i128>,
    operator: Operation,
    operatee: i128,
    test_div: i128,
    true_dest: usize,
    false_dest: usize,
    inspected: i128,
}

fn parse_monkeys(input: Vec<&str>) -> Vec<Monkey> {
    let mut monkeys: Vec<Monkey> = Vec::new();
    for monkey_instruction in input {
        let mut lines = monkey_instruction.lines();
        lines.next();
        let starting_items = lines.next().unwrap()[18..]
            .split(", ")
            .map(|x| x.parse::<i128>().unwrap())
            .collect::<Vec<i128>>();
        let operation = &lines.next().unwrap()[23..];
        let operator;
        let operatee;
        if operation == "* old" {
            operator = Operation::Squared;
            operatee = 0;
        } else if operation.chars().nth(0).unwrap() == '+' {
            operator = Operation::Add;
            operatee = operation[2..].parse::<i128>().unwrap();
        } else {
            operator = Operation::Multiply;
            operatee = operation[2..].parse::<i128>().unwrap();
        }
        let test_div = lines.next().unwrap()[21..].parse::<i128>().unwrap();

        let true_dest = lines.next().unwrap()[29..].parse::<usize>().unwrap();
        let false_dest = lines.next().unwrap()[30..].parse::<usize>().unwrap();
        let monkey = Monkey {
            items: starting_items,
            operator,
            operatee,
            test_div,
            true_dest,
            false_dest,
            inspected: 0,
        };
        monkeys.push(monkey);
    }
    monkeys
}

fn day11a(input: Vec<&str>) -> i128 {
    let mut monkeys = parse_monkeys(input);
    for _ in 0..20 {
        for index in 0..monkeys.len() {
            let monkey = monkeys.get(index).unwrap().clone();
            for item in &monkey.items {
                let worry_level = (match monkey.operator {
                    Operation::Multiply => item * monkey.operatee,
                    Operation::Add => item + monkey.operatee,
                    Operation::Squared => item * item,
                } / 3);
                if worry_level % monkey.test_div == 0 {
                    monkeys[monkey.true_dest].items.push(worry_level);
                } else {
                    monkeys[monkey.false_dest].items.push(worry_level);
                }
            }
            monkeys[index].inspected = monkeys[index].inspected + *&monkey.items.len() as i128;
            monkeys[index].items = Vec::new();
        }
    }
    monkeys.sort_by(|a, b| b.inspected.cmp(&a.inspected));
    monkeys[0].inspected * monkeys[1].inspected
}

fn day11b(input: Vec<&str>) -> i128 {
    let mut monkeys = parse_monkeys(input);
    let lcm: i128 = monkeys.iter().map(|m| m.test_div).product();
    for _ in 0..10000 {
        for index in 0..monkeys.len() {
            let monkey = monkeys.get(index).unwrap().clone();
            for item in &monkey.items {
                let worry_level = match monkey.operator {
                    Operation::Multiply => item * monkey.operatee,
                    Operation::Add => item + monkey.operatee,
                    Operation::Squared => item * item,
                } % lcm;
                if worry_level % monkey.test_div == 0 {
                    monkeys[monkey.true_dest].items.push(worry_level);
                } else {
                    monkeys[monkey.false_dest].items.push(worry_level);
                }
            }
            monkeys[index].inspected = monkeys[index].inspected + *&monkey.items.len() as i128;
            monkeys[index].items = Vec::new();
        }
    }
    monkeys.sort_by(|a, b| b.inspected.cmp(&a.inspected));
    monkeys[0].inspected * monkeys[1].inspected
}

fn criterion_benchmark(c: &mut Criterion) {
    let binding = read_to_string("input.txt").unwrap();
    let input = binding
        .split("\n\n")
        .filter(|line| !line.is_empty())
        .collect::<Vec<_>>();

    let mut group = c.benchmark_group("Day 11");
    group.bench_function("days11a", |b| b.iter(|| day11a(input.clone())));
    group.bench_function("days11b", |b| b.iter(|| day11b(input.clone())));
    println!("Part1: {}", day11a(input.clone()));
    println!("Part2: {}", day11b(input));
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
