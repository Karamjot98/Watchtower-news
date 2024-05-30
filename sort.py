import json

def load_sorted_cities(file_path):
    """ Load sorted city data from a JSON file. """
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def save_index_map(index_map, file_path):
    """ Save the index map to a JSON file. """
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(index_map, file, indent=4)

def create_index_map(sorted_cities):
    """ Create an index map for cities based on the first letter of each city name. """
    index_map = {}
    current_letter = ''
    start_index = 0

    for index, city in enumerate(sorted_cities):
        # Safely access the 'city' key
        city_name = city.get('city')
        if not city_name:
            print(f"Missing 'city' key at index {index}: {city}")  # Log the problematic entry
            continue  # Skip this entry

        first_letter = city_name[0].lower()
        if first_letter != current_letter:
            if current_letter:
                index_map[current_letter] = {"startIndex": start_index, "endIndex": index - 1}
            current_letter = first_letter
            start_index = index
    # Ensure to include the last letter range
    if current_letter:
        index_map[current_letter] = {"startIndex": start_index, "endIndex": len(sorted_cities) - 1}

    return index_map

def main():
    sorted_file_path = "sorted_cities.json"  # Path to your sorted cities JSON file
    index_map_file_path = "city_index_map.json"  # Path where the index map will be saved

    # Load sorted city data
    sorted_cities = load_sorted_cities(sorted_file_path)

    # Create index map
    index_map = create_index_map(sorted_cities)

    # Save index map to file
    save_index_map(index_map, index_map_file_path)

    print(f"Index map saved to {index_map_file_path}")

if __name__ == "__main__":
    main()
