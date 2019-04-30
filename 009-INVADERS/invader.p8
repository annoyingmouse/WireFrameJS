pico-8 cartridge // http://www.pico-8.com
version 16
__lua__

--[[
 "C:\Program Files (x86)\PICO-8\pico_debug.bat" -run C:\Users\annoy\OneDrive\Documents\WireFrameJS\009-INVADERS\invader.p8
--]]

Shot = {
  matrix = {
    {0, 0, 0, 1, 0, 0},
    {0, 0, 1, 0, 0, 0},
    {0, 0, 0, 1, 0, 0},
    {0, 0, 0, 0, 1, 0},
    {0, 0, 0, 1, 0, 0},
    {0, 0, 1, 0, 0, 0},
    {0, 0, 0, 1, 0, 0},
    {0, 0, 0, 0, 1, 0}
  },
  x = 0,
  y = -9,
  colour = 0
}
function Shot:new (o)
  o = o or {}
  setmetatable(o, self)
  self.__index = self
  return o
end

function Shot:update()
  add(self.matrix, deepcopy(self.matrix[1]))
  idel(self.matrix, 1)
  self.y += 1
end

Shield = {
  matrix = {
    {0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0},
    {0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0},
    {0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1}
  },
  x = 0,
  y = 100,
  colour = 11
}
function Shield:new (o)
  o = o or {}
  setmetatable(o, self)
  self.__index = self
  return o
end


shields = {}
shots = {}
points = 0
shot_tracker = 0
shots_tracker = 0


function _init()
  x = 7
  for i = 1, 4 do
    add(shields, Shield:new{x = x})
    x += 30
  end
  add(shots, Shot:new{x = flr(rnd(126)) - 3})
  
end

function _update()

  if shot_tracker < 2 then
    shot_tracker += 1
  else
    shot_tracker = 0
  end

  if shots_tracker < 120 then
    shots_tracker += 1
  else
    shots_tracker = 0
    add(shots, Shot:new{x = flr(rnd(127))})
  end

end

function _draw()
  cls(7)
  for s in pairs(shields) do
    for i in pairs(shields[s].matrix) do
      for j in pairs(shields[s].matrix[i]) do
        if shields[s].matrix[i][j] == 1 then
          pset(j + shields[s].x, i + shields[s].y, shields[s].colour);
        end
      end
    end
  end

  -- local shot_bits = {}
  for s in pairs(shots) do
    if shots[s].y > 127 then
      del(shots, y)
    elseif shot_tracker == 0 then
      shots[s]:update()  
    else
      for i in pairs(shots[s].matrix) do
        for j in pairs(shots[s].matrix[i]) do
          if shots[s].matrix[i][j] == 1 then
            --add(shot_bits, {j + shots[s].x, i + shots[s].y})
            pset(j + shots[s].x, i + shots[s].y, shots[s].colour);
          end
        end
      end
    end
  end
  -- for s in pairs(shot_bits) do
  --   pset(shot_bits[s][1], shot_bits[s][2], 0);
  -- end
end

function idel(t,i)
  local n=#t
  if (i>0 and i<=n) then
    for j=i,n-1 do 
      t[j]=t[j+1] 
    end
    t[n]=nil
  end
end

function deepcopy(orig)
  local orig_type = type(orig)
  local copy
  if orig_type == 'table' then
      copy = {}
      for orig_key, orig_value in next, orig, nil do
          copy[deepcopy(orig_key)] = deepcopy(orig_value)
      end
      setmetatable(copy, deepcopy(getmetatable(orig)))
  else -- number, string, boolean, etc
      copy = orig
  end
  return copy
end
