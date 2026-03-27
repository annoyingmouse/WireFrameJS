read_file = function (path)
    local file = io.open(path, "rb")
    if not file then return nil end

    local lines = {}

    for line in io.lines(path) do
        table.insert(lines, line)
    end

    file:close()
    return lines
end

function dump(tbl)
    io.write("{")
    for k, v in pairs(tbl) do
        io.write(k .. " = ")
        if type(v) == "table" then
            dump(v)
        else
            io.write(tostring(v))
        end
        io.write(", ")
    end
    io.write("}")
end

input = read_file("test.txt")

print(dump(input))